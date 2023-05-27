using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Appointments.Any()) return;
            var appointments = new List<Appointment>
            {
                new Appointment
                {
                    DateOfIssue = DateTime.UtcNow.AddDays(-7),
                    Description = "Pierwsza wizyta zalozona 7 dni temu",
                    PatiendId = 1,
                    DoctorId = 1,
                },
                new Appointment
                {
                    DateOfIssue = DateTime.UtcNow.AddDays(-3),
                    Description = "Druga wizyta zalozona 3 dni temu",
                    PatiendId = 2,
                    DoctorId = 2,
                },
            };
            await context.Appointments.AddRangeAsync(appointments);
            await context.SaveChangesAsync();
        }
    }
}