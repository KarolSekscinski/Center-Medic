using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Prescriptions;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class PrescriptionsController : BaseApiController
    {
        [HttpGet("user/{userId}")] // api/prescriptions/user
        public async Task<IActionResult> GetPrescriptionsForUser(string userId)
        {
            return HandleResult(await Mediator.Send(new List.Query{UserId = userId}));
        }

        [HttpGet("{id}")] // api/prescriptions/id
        public async Task<IActionResult> GetPrescription(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost] // api/prescriptions
        public async Task<IActionResult> CreatePrescription([FromBody]Prescription prescription)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Prescription = prescription}));
        }
        // [Authorize(Policy = "IsPrescriptionDoctor")]
        [HttpPut("{id}")] // api/prescriptions/id
        public async Task<IActionResult> EditPrescription(Guid id, [FromBody]Prescription prescription)
        {
            prescription.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Prescription = prescription}));
        }
        // [Authorize(Policy = "IsPrescriptionDoctor")]
        [HttpDelete("{id}")] // api/prescriptions/id
        public async Task<IActionResult> DeletePrescription(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
        [HttpPost("{id}/take")] // api/prescriptions/id/take
        public async Task<IActionResult> TakePrescription(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }

        
    }
}