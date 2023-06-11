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
                        PhoneNumber = "123456789",
                        IsDoctor = "true"   
                    },
                    new AppUser
                    {
                        DisplayName = "Krzysztof",
                        UserName = "krzysztof",
                        Email = "krzysztof@test.com",
                        Specialization = "Internista",
                        Name = "Krzysztof",
                        Surname = "Nowak",
                        PhoneNumber = "123456789",
                        IsDoctor = "true"   
                    },
                    new AppUser
                    {
                        DisplayName = "Paulina",
                        UserName = "paulina",
                        Email = "paulina@test.com",
                        Specialization = "Lekarz rodzinny",
                        Name = "Paulina",
                        Surname = "Kowalczyk",
                        PhoneNumber = "123456789",
                        IsDoctor = "true"   
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
                        IsDoctor = "false"   
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
                        IsDoctor = "false" 
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
                        IsDoctor = "false" 
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var appointments = new List<Appointment>
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
                var prescriptions = new List<Prescription>
                {
                    new Prescription
                    {
                        DateOfIssue = DateTime.UtcNow.AddMonths(-2),
                        Description = "Prescription 2 months ago",
                        Attendees = new List<PrescriptionAttendee>
                        {
                            new PrescriptionAttendee
                            {
                                AppUser = users[0],
                                IsDoctor = true
                            },
                            new PrescriptionAttendee
                            {
                                AppUser = users[5],
                                IsDoctor = false
                            },
                        }
                    },
                    new Prescription
                    {
                        DateOfIssue = DateTime.UtcNow.AddMonths(-1),
                        Description = "Prescription 1 month ago",
                        Attendees = new List<PrescriptionAttendee>
                        {
                            new PrescriptionAttendee
                            {
                                AppUser = users[0],
                                IsDoctor = true
                            },
                            new PrescriptionAttendee
                            {
                                AppUser = users[4],
                                IsDoctor = false
                            },
                        }
                    },
                    new Prescription
                    { 
                        DateOfIssue = DateTime.UtcNow.AddMonths(1),
                        Description = "Prescription 1 month in future",
                        Attendees = new List<PrescriptionAttendee>
                        {
                            new PrescriptionAttendee
                            {
                                AppUser = users[2],
                                IsDoctor = true
                            },
                            new PrescriptionAttendee
                            {
                                AppUser = users[3],
                                IsDoctor = false
                            },
                        }
                    },
                    new Prescription
                    {    
                        DateOfIssue = DateTime.UtcNow.AddMonths(2),
                        Description = "Prescription 2 months in future",
                        Attendees = new List<PrescriptionAttendee>
                        {
                            new PrescriptionAttendee
                            {
                                AppUser = users[0],
                                IsDoctor = true
                            },
                            new PrescriptionAttendee
                            {
                                AppUser = users[5],
                                IsDoctor = false
                            },
                        }
                    },
                    new Prescription
                    {
                        DateOfIssue = DateTime.UtcNow.AddMonths(3),
                        Description = "Prescription 3 months in future",
                        Attendees = new List<PrescriptionAttendee>
                        {
                            new PrescriptionAttendee
                            {
                                AppUser = users[1],
                                IsDoctor = true                            
                            },
                            new PrescriptionAttendee
                            {
                                AppUser = users[4],
                                IsDoctor = false                            
                            },
                        }
                    },
                };

                await context.Appointments.AddRangeAsync(appointments);
                await context.Prescriptions.AddRangeAsync(prescriptions);
                await context.SaveChangesAsync();
            }
        }
    }
}
