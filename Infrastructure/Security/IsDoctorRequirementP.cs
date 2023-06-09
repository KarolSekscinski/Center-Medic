using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsDoctorRequirementP : IAuthorizationRequirement
    {
        
    }
    public class IsDoctorRequirementPHandler : AuthorizationHandler<IsDoctorRequirementP>
    {
        private readonly DataContext _dbContext;
            private readonly IHttpContextAccessor _httpContextAccessor;
            
            public IsDoctorRequirementPHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor )
            {
                _httpContextAccessor = httpContextAccessor;
                _dbContext = dbContext;
            }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsDoctorRequirementP requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            var prescriptionId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var attendee = _dbContext.PrescriptionAttendees
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.AppUserId == userId && x.PrescriptionId == prescriptionId)
                .Result;

            if (attendee == null) return Task.CompletedTask;

            if (attendee.IsDoctor) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}