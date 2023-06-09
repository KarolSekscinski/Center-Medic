using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {

        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
                {
                    opt.Password.RequireNonAlphanumeric = false;
                    opt.User.RequireUniqueEmail = true;

                })
                .AddEntityFrameworkStores<DataContext>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });


            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsAppointmentDoctor", policy =>
                {
                    policy.Requirements.Add(new IsDoctorRequirement());
                });
            });
            services.AddTransient<IAuthorizationHandler, IsDoctorRequirementHandler>();

            // services.AddAuthorization(opt =>
            // {
            //     opt.AddPolicy("IsPrescriptionDoctor", policy =>
            //     {
            //         policy.Requirements.Add(new IsDoctorRequirementP());
            //     });
            // });
            // services.AddTransient<IAuthorizationHandler, IsDoctorRequirementPHandler>();

            services.AddScoped<TokenService>();
            return services;
        }
    }
}