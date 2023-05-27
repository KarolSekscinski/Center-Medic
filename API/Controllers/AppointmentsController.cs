using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class AppointmentsController : BaseApiController
    {
        
        private readonly DataContext _context;

        public AppointmentsController(DataContext context)
        {
            _context = context;
            
        }
        [HttpGet] //api/appointments
        public async Task<ActionResult<List<Appointment>>> GetAppointments()
        {
            return await _context.Appointments.ToListAsync();
        }
        [HttpGet("{id}")] //api/appointments/id
        public async Task<ActionResult<Appointment>> GetAppointment(Guid id)
        {
            return await _context.Appointments.FindAsync(id);
        }
    }
}