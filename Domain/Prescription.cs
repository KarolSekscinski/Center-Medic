using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Prescription
    {
        public Guid Id { get; set; }

        public DateTime DateOfIssue { get; set; }

        public string Description { get; set; }

        public bool Status { get; set; }

        public DateTime ValidUntil { get; set; }

        public DateTime DateOfSubmission { get; set; }

        public ICollection<PrescriptionAttendee> Attendees { get; set; } = new List<PrescriptionAttendee>();


    }
}