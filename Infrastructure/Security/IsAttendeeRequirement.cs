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
    public class IsAttendeeRequirement : IAuthorizationRequirement
    {
    }
    public class IsAttendeeRequirementHandler : AuthorizationHandler<IsAttendeeRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsAttendeeRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor )
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAttendeeRequirement requirement)
        {
            
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            var appointmentId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var attendee = _dbContext.AppointmentAttendees
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.AppointmentId == appointmentId && x.AppUserId == userId)
                .Result; //appointmentId, userId

            if (attendee == null) return Task.CompletedTask;

            if (attendee.IsDoctor)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}