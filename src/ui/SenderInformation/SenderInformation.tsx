import { OpenMail, Phone } from "../svg";
import { Colors } from "../../styles/colors";

type ContactIconProps = {
  type: Message["type"];
};

const ContactIcon = ({ type }: ContactIconProps) => {
  switch (type) {
    case "phone":
      return <Phone color={Colors.darkGrey} />;
    case "email":
    case "sms":
    default:
      return <OpenMail color={Colors.darkGrey} />;
  }
};

type SenderProps = {
  contact: Contact;
};

const formatPhoneNumber = (phoneNumber: Contact["phone"]) => {
  const phoneToArray = phoneNumber.split("");
  return phoneToArray.reduce((formattedPhoneNumber, char, index) => {
    if (index < 2) {
      return formattedPhoneNumber + char;
    }

    if (index % 2 === 0) {
      return formattedPhoneNumber + " " + char;
    }
    return formattedPhoneNumber + char;
  }, "");
};

const Sender = ({ contact }: SenderProps) => (
  <div className="sender-information__identity">
    <div className="sender-information__identity__name">
      {contact.firstname} {contact.lastname}
    </div>
    <div className="sender-information__identity__row">
      <p>Email</p>
      <p>{contact.email}</p>
    </div>
    <div className="sender-information__identity__row">
      <p>Téléphone</p>
      <p>{formatPhoneNumber(contact.phone)}</p>
    </div>
  </div>
);

type SenderInformationProps = {
  contact: Contact;
  type: Message["type"];
};

const SenderInformation = ({ contact, type }: SenderInformationProps) => (
  <section className="sender-information">
    <ContactIcon type={type} />
    <Sender contact={contact} />
  </section>
);

export default SenderInformation;
