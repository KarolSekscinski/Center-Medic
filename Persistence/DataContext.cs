using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<AppointmentAttendee> AppointmentAttendees { get; set; }

        public DbSet<Prescription> Prescriptions { get; set; }

        public DbSet<PrescriptionAttendee> PrescriptionAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppointmentAttendee>(x => x.HasKey(aa => new {aa.AppointmentId, aa.AppUserId}));
            builder.Entity<AppointmentAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Appointments)
                .HasForeignKey(aa => aa.AppUserId);
            builder.Entity<AppointmentAttendee>()
                .HasOne(u => u.Appointment)
                .WithMany(a => a.Attendees)
                .HasForeignKey(aa => aa.AppointmentId);

            builder.Entity<PrescriptionAttendee>(x => x.HasKey(aa => new {aa.PrescriptionId, aa.AppUserId}));
            builder.Entity<PrescriptionAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Prescriptions)
                .HasForeignKey(aa => aa.AppUserId);
            builder.Entity<PrescriptionAttendee>()
                .HasOne(u => u.Prescription)
                .WithMany(a => a.Attendees)
                .HasForeignKey(aa => aa.PrescriptionId);
        }
    }
}