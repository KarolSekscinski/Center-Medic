using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Appointments;
using Application.Prescriptions;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Appointment, Appointment>();

            CreateMap<Appointment, AppointmentDto>()
                .ForMember(d => d.DoctorUsername, o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsDoctor).AppUser.UserName));

            CreateMap<AppointmentAttendee, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName));

            CreateMap<Prescription, Prescription>();
            CreateMap<Prescription, PrescriptionDto>()
                .ForMember(d => d.DoctorUsername, o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsDoctor).AppUser.UserName));
            CreateMap<PrescriptionAttendee, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName));
        }
    }
}