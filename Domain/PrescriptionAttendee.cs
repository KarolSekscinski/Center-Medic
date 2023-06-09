using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class PrescriptionAttendee
    {
        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public Guid PrescriptionId { get; set; }

        public Prescription Prescription { get; set; }

        public bool IsDoctor { get; set; }
    }
}