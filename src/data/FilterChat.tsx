import * as Yup from 'yup';

const library = [
  "fuck",
  "acab",
  "arese",
  "ass",
  "asshole",
  "bitch",
  "bastard",
  "cock",
  "cunt",
  "dick",
  "fag",
  "faggot",
  "gook",
  "heck",
  "maggot",
  "muff",
  "nigger",
  "nigga",
  "negro",
  "pussy",
  "shit",
  "slut",
  "whore"
];

export const filterText = (text: string) => {
  var filterString = text.toLowerCase();

  for (var n = 0; n < library.length; n++) {

    if (filterString.indexOf(library[n]) != -1) {
      console.log('욕설 감지');
      return false;
    }
  }

  return true;
};
