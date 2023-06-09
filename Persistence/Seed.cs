using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Appointments.Any())
            {
                var users = new List<AppUser>
                {
                    //Doctors
                    new AppUser
                    {
                        DisplayName = "Karol",
                        UserName = "karol",
                        Email = "karol@test.com",
                        Specialization = "Kardiolog",
                        Name = "Karol",
                        Surname = "Kowalski",
                        PhoneNumber = "123456789"    
                    },
                    new AppUser
                    {
                        DisplayName = "Krzysztof",
                        UserName = "krzysztof",
                        Email = "krzysztof@test.com",
                        Specialization = "Internista",
                        Name = "Krzysztof",
                        Surname = "Nowak",
                        PhoneNumber = "123456789"
                    },
                    new AppUser
                    {
                        DisplayName = "Paulina",
                        UserName = "paulina",
                        Email = "paulina@test.com",
                        Specialization = "Lekarz rodzinny",
                        Name = "Paulina",
                        Surname = "Kowalczyk",
                        PhoneNumber = "123456789"
                    },
                    //Patients
                    new AppUser
                    {
                        DisplayName = "Jan",
                        UserName = "jan",
                        Email = "jan@test.com",
                        Name = "Jan",
                        Surname = "Kowalski",
                        PhoneNumber = "123456789",
                        Pesel = "12345678901",
                        DateOfBirth = DateTime.UtcNow.AddYears(-20),
                        Sex = "M",
                    },
                    new AppUser
                    {
                        DisplayName = "Anna",
                        UserName = "anna",
                        Email = "anna@test.com",
                        Name = "Anna",
                        Surname = "Nowak",
                        PhoneNumber = "123456789",
                        Pesel = "12345678901",
                        DateOfBirth = DateTime.UtcNow.AddYears(-40),
                        Sex = "K",
                    },
                    new AppUser
                    {
                        DisplayName = "Piotr",
                        UserName = "piotr",
                        Email = "piotr@test.com",
                        Name = "Piotr",
                        Surname = "Kowalczyk",
                        PhoneNumber = "123456789",
                        Pesel = "12345678901",
                        DateOfBirth = DateTime.UtcNow.AddYears(-60),
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var activities = new List<Appointment>
                {
                    new Appointment
                    {
                        DateOfIssue = DateTime.UtcNow.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[0],
                                IsDoctor = true
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[5],
                                IsDoctor = false
                            },
                        }
                    },
                    new Appointment
                    {
                        DateOfIssue = DateTime.UtcNow.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[0],
                                IsDoctor = true
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[4],
                                IsDoctor = false
                            },
                        }
                    },
                    new Appointment
                    { 
                        DateOfIssue = DateTime.UtcNow.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[2],
                                IsDoctor = true
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[3],
                                IsDoctor = false
                            },
                        }
                    },
                    new Appointment
                    {    
                        DateOfIssue = DateTime.UtcNow.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[0],
                                IsDoctor = true
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[5],
                                IsDoctor = false
                            },
                        }
                    },
                    new Appointment
                    {
                        DateOfIssue = DateTime.UtcNow.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[1],
                                IsDoctor = true                            
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[4],
                                IsDoctor = false                            
                            },
                        }
                    },
                    new Appointment
                    {    
                        DateOfIssue = DateTime.UtcNow.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[1],
                                IsDoctor = true                            
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[3],
                                IsDoctor = false                            
                            },
                        }
                    },
                    new Appointment
                    {
                        
                        DateOfIssue = DateTime.UtcNow.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[0],
                                IsDoctor = true                            
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[5],
                                IsDoctor = false                            
                            },
                        }
                    },
                    new Appointment
                    {
                        DateOfIssue = DateTime.UtcNow.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[2],
                                IsDoctor = true                            
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[4],
                                IsDoctor = false                            
                            },
                        }
                    },
                    new Appointment
                    {
                        DateOfIssue = DateTime.UtcNow.AddMonths(7),
                        Description = "Activity 7 months in future",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[0],
                                IsDoctor = true                            
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[3],
                                IsDoctor = false                            
                            },
                        }
                    },
                    new Appointment
                    {
                        DateOfIssue = DateTime.UtcNow.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[2],
                                IsDoctor = true                            
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[5],
                                IsDoctor = false                            
                            },
                        }
                    }
                };

                await context.Appointments.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
