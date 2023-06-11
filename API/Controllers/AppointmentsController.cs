using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Appointments;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API.Controllers
{
    [AllowAnonymous]
    public class AppointmentsController : BaseApiController
    {
        
        [HttpGet] //api/appointments
        public async Task<IActionResult> GetAppointments()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
           
        }

        [HttpGet("user/{userId}")] //api/appointments/user
        public async Task<IActionResult> GetAppointmentsForUser( string userId)
        {
            return HandleResult(await Mediator.Send(new List.Query{UserId = userId}));
           
        }
        
        [HttpGet("{id}")] //api/appointments/id
        public async Task<IActionResult> GetAppointment(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));

        }
        [HttpPost]
        public async Task<IActionResult> CreateAppointment([FromBody]Appointment appointment)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Appointment = appointment}));
        }
        // [Authorize(Policy = "IsAppointmentDoctor")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditAppointment(Guid id, [FromBody]Appointment appointment)
        {
            appointment.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Appointment = appointment}));
        }
        // [Authorize(Policy = "IsAppointmentDoctor")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }
    }
}