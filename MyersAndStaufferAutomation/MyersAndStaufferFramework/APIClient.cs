﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MyersAndStaufferFramework
{
    public class APIClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiUrl;

        public APIClient(string apiUrl)
        {
            _apiUrl = apiUrl;
            _httpClient = new HttpClient();
        }

        public async Task<string> MakeApiRequest(string jsonPayload)
        {
            try
            {
                StringContent content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await _httpClient.PostAsync(_apiUrl, content);

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }
                else
                {
                    throw new HttpRequestException($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                }
            }
            catch (HttpRequestException ex)
            {
                throw new HttpRequestException($"HTTP Request Error: {ex.Message}");
            }
        }
    }
}