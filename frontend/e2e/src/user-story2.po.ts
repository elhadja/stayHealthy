export class UserStory2Po {
  async isASpeciality(speciality: string): Promise<boolean> {

      const Cardiologue = speciality === 'cardiologue';
      const Chirurgien = speciality === ('chirurgien');
      const Dentiste = speciality === ('dentiste');
      const Diététicien = speciality === ('dieteticien');
      const Dermatologue = speciality === ('dermatologue');
      const Généraliste = speciality === ('generaliste');
      const Gynécologue = speciality === ('gynecologue');
      const Neurologue = speciality === ('neurologue');
      const Psychologue = speciality === ('psychologue');
      const Ophtalmologue = speciality === ('ophtalmologue');
      const ORL = speciality === ('orl');
      const Ostéopathe = speciality === ('osteopathe');
      return (Cardiologue || Chirurgien || Dentiste || Diététicien || Dermatologue ||
      Généraliste || Gynécologue || Neurologue || Psychologue || Ophtalmologue || ORL || Ostéopathe);
  }
}
