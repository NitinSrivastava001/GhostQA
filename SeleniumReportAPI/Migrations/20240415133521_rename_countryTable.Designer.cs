﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SeleniumReportAPI.DBContext;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20240415133521_rename_countryTable")]
    partial class rename_countryTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.25")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.Applications", b =>
                {
                    b.Property<int>("ApplicationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ApplicationId");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ApplicationId"), 1000L, 1);

                    b.Property<string>("ApplicationName")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasColumnName("ApplicationName");

                    b.HasKey("ApplicationId");

                    b.ToTable("tbl_Applications");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FullName")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<bool?>("IsDisabled")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("OrganizationName")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.Browsers", b =>
                {
                    b.Property<int>("BrowserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BrowserId"), 1L, 1);

                    b.Property<string>("BrowserName")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasColumnName("BrowserName");

                    b.HasKey("BrowserId");

                    b.ToTable("tbl_Browsers");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.CypressDetails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("EndDateTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StartDateTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SuiteDuration")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TestCaseDetailsId")
                        .HasColumnType("int");

                    b.Property<string>("TestCaseId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestCaseName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestDuration")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestScreenShotUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestStepJson")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestSuite")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestVideoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TesterName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("tbl_CypressTestExecution");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.CypressPerfomanceDetaills", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("EndDateTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LoactionDataJson")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("LoadDataJson")
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("MaxDuration")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PropertyDataJson")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RootId")
                        .HasColumnType("int");

                    b.Property<string>("RunId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Scenarios")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StartDateTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestDataJson")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TesterName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TotalDuration")
                        .HasColumnType("int");

                    b.Property<int>("TotalRampUpSteps")
                        .HasColumnType("int");

                    b.Property<int>("TotalRampUpTime")
                        .HasColumnType("int");

                    b.Property<int>("TotalUser")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("tbl_CypressPerfomanceDetaills");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.Environments", b =>
                {
                    b.Property<int>("EnvironmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("EnvironmentId");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EnvironmentId"), 1000L, 1);

                    b.Property<int>("ApplicationId")
                        .HasColumnType("int");

                    b.Property<string>("BasePath")
                        .IsRequired()
                        .HasColumnType("varchar(1000)")
                        .HasColumnName("BasePath");

                    b.Property<string>("Baseurl")
                        .IsRequired()
                        .HasColumnType("varchar(1000)")
                        .HasColumnName("Baseurl");

                    b.Property<int>("BroswerId")
                        .HasColumnType("int");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DriverPath")
                        .IsRequired()
                        .HasColumnType("varchar(1000)")
                        .HasColumnName("DriverPath");

                    b.Property<string>("EnvironmentName")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasColumnName("EnvironmentName");

                    b.Property<string>("ModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("EnvironmentId");

                    b.ToTable("tbl_Environments");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.InternalTestExecution", b =>
                {
                    b.Property<string>("EndDateTime")
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("EndDateTime");

                    b.Property<string>("StartDateTime")
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("StartDateTime");

                    b.Property<string>("Status")
                        .HasColumnType("VARCHAR(10)")
                        .HasColumnName("Status");

                    b.Property<string>("SuiteDuration")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestCase")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("TestCase");

                    b.Property<string>("TestDuration")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestRun")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("TestCaseName");

                    b.Property<string>("TestScreenShotUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestStepJson")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestSuite")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("TestSuite");

                    b.Property<string>("TestVideoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TesterName")
                        .HasColumnType("nvarchar(max)");

                    b.ToTable("tbl_InternalTestExecutions");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.Load", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("DurationInMinutes")
                        .HasColumnType("int");

                    b.Property<int>("PerformanceFileId")
                        .HasColumnType("int");

                    b.Property<int?>("RampUpSteps")
                        .HasColumnType("int");

                    b.Property<int?>("RampUpTimeInSeconds")
                        .HasColumnType("int");

                    b.Property<int?>("TotalUsers")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("tbl_Load");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CountryName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("tbl_Location");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.PerformanceFile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("FileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FilePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RootId")
                        .HasColumnType("int");

                    b.Property<string>("TestCaseName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("tbl_PerformanceFile");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.PerformanceLocation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberUser")
                        .HasColumnType("int");

                    b.Property<decimal>("PercentageTraffic")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("PerformanceFileId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("tbl_PerformanceLocation");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.PerformanceProperties", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PerformanceFileId")
                        .HasColumnType("int");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("tbl_PerformanceProperties");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.ProjectRootRelation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ParentId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("tbl_ProjectRootRelation");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.RootRelation", b =>
                {
                    b.Property<int>("RootId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RootId"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Node")
                        .HasColumnType("int");

                    b.Property<int?>("Parent")
                        .HasColumnType("int");

                    b.HasKey("RootId");

                    b.ToTable("tbl_RootRelation");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.TestCase", b =>
                {
                    b.Property<string>("TestCaseName")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("TestCaseName");

                    b.Property<string>("TestCaseStatus")
                        .HasColumnType("VARCHAR(10)")
                        .HasColumnName("TestCaseStatus");

                    b.Property<string>("TestCaseSteps")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestCaseVideoURL")
                        .HasColumnType("NVARCHAR(1000)")
                        .HasColumnName("TestCaseVideoURL");

                    b.Property<string>("TestEnvironment")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("TestEnvironment");

                    b.Property<string>("TestRunEndDateTime")
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("TestRunEndDateTime");

                    b.Property<string>("TestRunName")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("TestRunName");

                    b.Property<string>("TestRunStartDateTime")
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("TestRunStartDateTime");

                    b.Property<string>("TestSuiteEndDateTime")
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("TestSuiteEndDateTime");

                    b.Property<string>("TestSuiteName")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("TestSuiteName");

                    b.Property<string>("TestSuiteStartDateTime")
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("TestSuiteStartDateTime");

                    b.Property<string>("TesterName")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("TesterName");

                    b.ToTable("tbl_TestCase");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.TestCaseDetails", b =>
                {
                    b.Property<int>("TestCaseDetailsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TestCaseDetailsId"), 1L, 1);

                    b.Property<int>("RootId")
                        .HasColumnType("int");

                    b.Property<string>("StartUrl")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasColumnName("StartUrl");

                    b.Property<string>("TestCaseName")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasColumnName("TestCaseName");

                    b.HasKey("TestCaseDetailsId");

                    b.ToTable("tbl_TestCaseDetails");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.TestData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("FilePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JsonData")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PerformanceFileId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("tbl_TestData");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.TestExecution", b =>
                {
                    b.Property<int>("ExecutionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ExecutionId");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ExecutionId"), 1000L, 1);

                    b.Property<DateTime>("ExecutionStartTime")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsExecutionInProgress")
                        .HasColumnType("bit");

                    b.Property<string>("TestCaseName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestEnvironment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestRunName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestSuiteName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TesterName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ExecutionId");

                    b.ToTable("tbl_TestExecution");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.TestStepsDetails", b =>
                {
                    b.Property<int>("TestStepsDetailsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TestStepsDetailsId"), 1L, 1);

                    b.Property<string>("Action")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContainTextValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CssProperty")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CssValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CurrentUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ElementValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HaveAttributeValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("IsOptional")
                        .HasColumnType("bit");

                    b.Property<string>("PageTitle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ScrollPixel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SelectedUser")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SelectorType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SelectorValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SendKeyInput")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShouldEqualValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShouldGreaterThanValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShouldIncludeValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShouldLessValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShouldNotEqualValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StepDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TestCaseDetailsId")
                        .HasColumnType("int");

                    b.Property<string>("TextValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TestStepsDetailsId");

                    b.ToTable("tbl_TestStepsDetails");
                });

            modelBuilder.Entity("SeleniumReportAPI.Models.TestSuites", b =>
                {
                    b.Property<int>("TestSuiteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("TestSuiteId");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TestSuiteId"), 1000L, 1);

                    b.Property<int>("ApplicationId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EnvironmentId")
                        .HasColumnType("int");

                    b.Property<string>("SelectedTestCases")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("SendEmail")
                        .HasColumnType("bit");

                    b.Property<string>("TestSuiteName")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasColumnName("TestSuiteName");

                    b.Property<string>("TestSuiteType")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TestSuiteId");

                    b.ToTable("tbl_TestSuites");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("SeleniumReportAPI.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("SeleniumReportAPI.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SeleniumReportAPI.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("SeleniumReportAPI.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
