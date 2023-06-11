import { useEffect, useState } from "react";
import { DropdownItemProps } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { User } from "../../models/user";
import MySelectInput from "./MySelectInput";

export default function DoctorsSelectInput() {
  const [doctorsOptions, setDoctors] = useState<DropdownItemProps[]>([]);
  const {
    userStore: { doctors, getDoctors },
  } = useStore();

  const getDoctorsFromApi = () => {
    try {
      getDoctors();
      const doctorsData: User[] = doctors;
      const dropdownItems: DropdownItemProps[] = doctorsData.map(
        (doctor: User) => {
          return {
            key: doctor.appUserId,
            text: doctor.displayName,
            value: doctor.appUserId,
          };
        }
      );
      setDoctors(dropdownItems);
      console.log(doctorsOptions);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (doctorsOptions.length === 0)
        getDoctorsFromApi();
  }, [doctors]);

  return <MySelectInput placeholder="Lekarz" name="doctor" options={doctorsOptions} />;
}
