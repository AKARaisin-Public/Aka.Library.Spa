﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Aka.Library.Api
{
    public class StatusCodeExceptionHandler
    {
        private readonly RequestDelegate request;

        public StatusCodeExceptionHandler(RequestDelegate pipeline)
        {
            this.request = pipeline;
        }

        public Task Invoke(HttpContext context) => this.InvokeAsync(context); // Stops VS from nagging about async method without ...Async suffix.

        private async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await this.request(context);
            }
            catch (StatusCodeException exception)
            {
                context.Response.StatusCode = (int)exception.StatusCode;
                context.Response.Headers.Clear();
            }
        }
    }
}