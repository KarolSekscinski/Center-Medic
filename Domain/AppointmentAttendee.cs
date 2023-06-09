using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class AppointmentAttendee
    {
        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public Guid AppointmentId { get; set; }

        public Appointment Appointment { get; set; }

        public bool IsDoctor { get; set; }

        



    }
}