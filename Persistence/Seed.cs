using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Karol",
                        UserName = "karol",
                        Email = "karol@test.com",
                    },
                    new AppUser
                    {
                        DisplayName = "Kamil",
                        UserName = "kamil",
                        Email = "kamil@test.com",
                    },
                    new AppUser
                    {
                        DisplayName = "Krzysztof",
                        UserName = "krzysztof",
                        Email = "krzysztof@test.com",
                    },
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

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