using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;

namespace Application.Appointments
{
    public class AppointmentDto
    {
        public Guid Id { get; set; }

        public DateTime DateOfIssue { get; set; }

        public string Description { get; set; }

        public string DoctorUsername { get; set; }

        public bool isCancelled { get; set; }

        public bool isDone { get; set; }

        public ICollection<Profile> Attendees { get; set; }
    }
}