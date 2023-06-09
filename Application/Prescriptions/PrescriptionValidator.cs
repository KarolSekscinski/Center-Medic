using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Prescriptions
{
    public class PrescriptionValidator : AbstractValidator<Prescription>
    {
        public PrescriptionValidator()
        {
            RuleFor(x => x.DateOfIssue).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }
    }
}