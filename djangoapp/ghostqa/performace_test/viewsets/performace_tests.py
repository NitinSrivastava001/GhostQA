import json
import mimetypes
import os
from io import BytesIO
from django.core.files.base import File
import yaml
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from drf_spectacular.openapi import AutoSchema
from drf_spectacular.utils import extend_schema
from PIL import Image as PILImage
from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from ..models import PerformaceTestSuite,TestContainersRuns,TestArtifacts
from ..utils.jmx_file import replace_thread_group
from ..serializers.performace_tests import PerformaceTestSuiteSerializer,TestContainersRunsSerializer,TestArtifactsSerializer
from cypress.utils import (format_javascript,check_container_status, convert_to_unix_path,
                           create_directory, directory_exists, get_full_path,copy_files_and_folders,
                           list_files_in_directory)

from ..docker.containers import start_jmeter_test2,start_jmeter_test
from agent_dynamic_location.models import Job, Agent, PrivateLocation, LoadDistribution, CustomToken
from agent_dynamic_location.serializers import JobSerializer
from django.utils import timezone

class PerformaceViewSet(mixins.CreateModelMixin,viewsets.ReadOnlyModelViewSet):
    queryset = PerformaceTestSuite.objects.all()
    serializer_class = PerformaceTestSuiteSerializer

    def get_parser_classes(self):
        return [MultiPartParser]
    
    # @action(detail=True,methods=['GET'])
    # def execute(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     container_run = TestContainersRuns.objects.create(
    #         suite = instance,
    #         container_status= f"pending"
    #     )
    #     container_run.container_name =  f"{instance.name}-{container_run.ref}"
    #     container_run.save()
        
    #     name = container_run.container_name
    #     volume_path = f"/tests/performace/{name}/"
    #     volume_path = get_full_path(volume_path)
    #     volume_path = convert_to_unix_path(volume_path)
    #     if settings.SHARED_PERFORMACE_PATH:
    #             volume_path = f"{settings.SHARED_PERFORMACE_PATH}/performace/{name}/"
        
    #     if instance.type == "jmeter":
    #         create_directory(f"{volume_path}/html-results")
    #         with open(f"{volume_path}/test.jmx", "wb") as file:
    #             file.write(instance.test_file.read())
                
    #         print("STARTING CONTAINER")
    #         start_jmeter_test(name,volume_path,instance.jthreads,instance.jrampup,container_run)
            
    #     return Response({
    #         "status":   "success",
    #         "data":self.get_serializer(instance).data
    #     })
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
        
    @action(detail=True,methods=['GET'])  
    def execute_instance(self, request, *args, **kwargs):
        
        instance = self.get_object()
        
        container_run = TestContainersRuns.objects.create(
            suite = instance,
            container_status= f"pending"
        )
        container_run.container_name =  f"{instance.name}-{container_run.ref}"
        container_run.client_reference_id = instance.client_reference_id
        container_run.save()
        
        BASE_DIR  = settings.BASE_DIR
        JMETER_CONFIG_PATH = os.path.abspath(os.path.join(BASE_DIR,"performace_test","jmeter"))
        
        name = container_run.container_name
        volume_path = f"/tests/performace/{name}/"
        volume_path = get_full_path(volume_path)
        volume_path = convert_to_unix_path(volume_path)
        if settings.SHARED_PERFORMACE_PATH:
                volume_path = f"{settings.SHARED_PERFORMACE_PATH}/performace/{name}/"
        
        if instance.type == "jmeter":
            create_directory(f"{volume_path}")
            copy_files_and_folders(JMETER_CONFIG_PATH,volume_path)                   
            create_directory(f"{volume_path}/html-results")
            
            with open(f"{volume_path}/test.jmx", "wb") as file:
                file.write(instance.test_file.read())
                
            print("STARTING CONTAINER")
            start_jmeter_test2(name,volume_path,instance.jthreads_total_user,instance.jrampup_time,container_run)
            
        return Response({
            "status":   "success",
            "data":self.get_serializer(instance).data
        })
    
    @action(detail=False,methods=['POST'])
    def execute(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        instance = serializer.instance
        
        container_run = TestContainersRuns.objects.create(
            suite = instance,
            container_status= f"pending"
        )
        container_run.container_name =  f"{instance.name}-{container_run.ref}"
        container_run.client_reference_id = instance.client_reference_id
        container_run.save()
        
        BASE_DIR  = settings.BASE_DIR
        JMETER_CONFIG_PATH = os.path.abspath(os.path.join(BASE_DIR,"performace_test","jmeter"))
        
        name = container_run.container_name
        volume_path = f"/tests/performace/{name}/"
        volume_path = get_full_path(volume_path)
        volume_path = convert_to_unix_path(volume_path)
        if settings.SHARED_PERFORMACE_PATH:
                volume_path = f"{settings.SHARED_PERFORMACE_PATH}/performace/{name}/"
        
        if instance.type == "jmeter":
            create_directory(f"{volume_path}")
            copy_files_and_folders(JMETER_CONFIG_PATH,volume_path)                   
            create_directory(f"{volume_path}/html-results")
            
            with open(f"{volume_path}/test.jmx", "w") as file:
                file.write(instance.test_file.read())
            
            with open(f"{volume_path}/test.jmx", "rb") as file:
                
                container_run.test_file = File(file, "test.jmx")
                container_run.save()
                
                
            print("STARTING CONTAINER")
            start_jmeter_test2(name,volume_path,instance.jthreads_total_user,instance.jrampup_time,container_run)
            
        return Response({
            "status":   "success",
            "data":self.get_serializer(instance).data
        })
    @action(detail=False,methods=['POST'])
    def execute2(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        instance = serializer.instance
        
        container_run = TestContainersRuns.objects.create(
            suite = instance,
            container_status= f"pending"
        )
        container_run.container_name =  f"{instance.name}-{container_run.ref}"
        container_run.client_reference_id = instance.client_reference_id
        container_run.save()
        
        BASE_DIR  = settings.BASE_DIR
        JMETER_CONFIG_PATH = os.path.abspath(os.path.join(BASE_DIR,"performace_test","jmeter"))
        
        name = container_run.container_name
        volume_path = f"/tests/performace/{name}"
        volume_path = get_full_path(volume_path)
        volume_path = convert_to_unix_path(volume_path)
        if settings.SHARED_PERFORMACE_PATH:
                volume_path = f"{settings.SHARED_PERFORMACE_PATH}/performace/{name}"
        
        if instance.type == "jmeter":
            create_directory(f"{volume_path}")
            copy_files_and_folders(JMETER_CONFIG_PATH,volume_path)                   
            create_directory(f"{volume_path}/html-results")
            
            with open(f"{volume_path}/test.jmx", "w") as file:
                jmx_text_content = replace_thread_group(instance.test_file.read(), jmx_properties=request.data)
                file.write(jmx_text_content)
            with open(f"{volume_path}/test.jmx", "rb") as file:
                
                container_run.test_file = File(file, "test.jmx")
                container_run.save()
                
                
            print("STARTING CONTAINER")
            start_jmeter_test2(name,volume_path,instance.jthreads_total_user,instance.jrampup_time,container_run)
            
        return Response({
            "status":   "success",
            "data":self.get_serializer(instance).data
        })
            
    @action(detail=False,methods=['POST'])
    def execute3(self, request, *args, **kwargs):
        # agent_id = request.data.pop('agent', None)
        private_location = request.data.pop('private_location', None)
        percentage_of_traffic = request.data.pop('percentage_of_traffic', None)
        number_of_users = request.data.pop('number_of_users', None)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        instance = serializer.instance
        
        container_run = TestContainersRuns.objects.create(
            suite = instance,
            container_status= f"pending"
        )
        container_run.container_name =  f"{instance.name}-{container_run.ref}"
        container_run.client_reference_id = instance.client_reference_id
        container_run.save()
        
        if private_location is None or percentage_of_traffic is None or number_of_users is None:
            return Response({
                "status": "error",
                "message": "private_location, percentage_of_traffic and number_of_users are required"
            }, status=status.HTTP_400_BAD_REQUEST)
            
        location = get_object_or_404(PrivateLocation, ref=private_location[0])
            
        load_distribution = LoadDistribution.objects.create(
            private_location = location,
            percentage_of_traffic =percentage_of_traffic[0],
            number_of_users =number_of_users[0]
        )
            
        agent = self.get_available_agent(location)
        print("Agent is :", agent)
        if agent is None:
            return Response({
                "status": "error",
                "message": "No available agents"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        agent = get_object_or_404(Agent, id=agent.id)
            
        try:
            if instance.type == "jmeter":
                job = Job.objects.create(
                    field_type=f'{instance.type}',
                    performance_test_suite=instance,
                    job_status="queued",
                    agent=agent
                )
                agent.agent_status = 'Occupied'
                agent.save()
        except Exception as e:
            return Response({
                "status": "error",
                "message": f"Failed to create job: {str(e)}"
            }, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({
            "status":   "success",
            "message": "queued",
            "location_id": location.ref,
            "agent_id": agent.ref,
            "job": JobSerializer(job).data,
            "data":self.get_serializer(instance).data
        }, status=status.HTTP_201_CREATED)            


    @action(methods=['get'],detail=True)
    def get_file(self,request,*args, **kwargs):
        view_name = request.resolver_match.url_name
        print(view_name)
        artifacts = get_object_or_404(TestArtifacts,**kwargs)
        
        if artifacts.type == "logs":
            # Open the image using PIL
            files = artifacts.files

            # Convert the PIL image to bytes

            # Create the HTTP response with the image data
            response = HttpResponse(files.read())
            response["Content-Disposition"] = f'attachment; filename="{files.name}"'
            return response
        
        if artifacts.type == 'statistics':
            # Open the image using PIL
            file_data = artifacts.files.read().decode('utf-8')
            
            data = json.loads(file_data)
            return Response(data)
        if artifacts.type == "video":

            # Open the video file
            chunk_size = 8192  # Adjust the chunk size according to your needs

            # Set appropriate content type for video streaming
            content_type, encoding = mimetypes.guess_type(artifacts.files.path)
            response = HttpResponse(content_type=content_type)
            response["Content-Disposition"] = (
                f'inline; filename="{os.path.basename(artifacts.files.path)}"'
            )

            # Stream the video content
            with open(artifacts.files.path, "rb") as video_file:
                for chunk in iter(lambda: video_file.read(chunk_size), b""):
                    response.write(chunk)

            return response
        return JsonResponse({
            "error":"error"
        },status=400) 
        
             
    @action(methods=['get'],detail=True)
    def monitor_container_run(self,request,*args, **kwargs):
        container_run = get_object_or_404(TestContainersRuns,**kwargs)
        
        
        return Response({
            **TestContainersRunsSerializer(container_run).data
        })
        
        
    def get_available_agent(self, location):
        agent =  None
        try:
            available_agent = Agent.objects.filter(location=location.id, agent_status="available")
            if available_agent.exists():
                agent = available_agent.first()
                print(f'Available Agent : {agent.name}')
            else:
                print('No available agents found')
        except Agent.DoesNotExist:
            print('No available agents found')
            
        return agent
                
    
    def combine_raw_data(self, request):
        location_ref_id = request.query_params.get('location_ref_id', None)
        if not location_ref_id:
            return Response({"error": "location_ref_id parameter is required"}, status=400)
        
        # Filter jobs based on the location ref id
        jobs = Job.objects.filter(location_ref_id=location_ref_id)

        if not jobs.exists():
            return Response({"error": "No jobs found for the given location ref id"}, status=404)
        
        # Retrieve and combine raw data
        combined_data = self._combine_data(jobs)

        return Response(combined_data, status=200)

    def _combine_data(self, jobs):
        combined_raw_data = []

        for job in jobs:
            raw_data = job.raw_data  # assuming raw_data is a list of dicts
            combined_raw_data.extend(raw_data)

        return combined_raw_data