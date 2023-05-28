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

        public int PatiendId { get; set; }

        public int DoctorId { get; set; }
        
        public DateTime DateOfIssue { get; set; }

        public string Description { get; set; }

    }
}