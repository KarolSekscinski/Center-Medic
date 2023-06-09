using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;

namespace Application.Prescriptions
{
    public class PrescriptionDto
    {
        public Guid Id { get; set; }

        public DateTime DateOfIssue { get; set; }

        public string Description { get; set; }

        public string Status { get; set; }

        public DateTime ValidUntil { get; set; }

        public DateTime DateOfSubmission { get; set; }

        public string DoctorUsername { get; set; }

        public string PatientUsername { get; set; }

        public ICollection<Profile> Attendees { get; set; }
    }
}