using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Appointment
    {
        public Guid Id { get; set; }

        public DateTime DateOfIssue { get; set; }

        public string Description { get; set; }

        public bool isCancelled { get; set; }

        public bool isDone { get; set; }

        public ICollection<AppointmentAttendee> Attendees { get; set; } = new List<AppointmentAttendee>();

    }
}