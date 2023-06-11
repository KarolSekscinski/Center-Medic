using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Specialization { get; set; }

        public string Pesel { get; set; }

        public string Sex { get; set; }

        public bool IsDoctor { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public ICollection<AppointmentAttendee> Appointments { get; set; }

        public ICollection<PrescriptionAttendee> Prescriptions { get; set; }
        
    }
}