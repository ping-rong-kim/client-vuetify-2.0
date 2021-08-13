export default {
  rules: [
    v => !!v || "Password is required",
    v => {
      let azCount = 0;
      let AZCount = 0;
      let numberCount = 0;
      let specialCount = 0;
      for (let i = 0; i < v.length; i++) {
        const char = v[i];
        if (/^[a-z]$/.test(char)) {
          azCount++;
        } else if (/^[A-Z]$/.test(char)) {
          AZCount++;
        } else if (/^\d$/.test(char)) {
          numberCount++;
        } else {
          specialCount++;
        }
      }
      if (
        azCount >= 1 &&
        AZCount >= 1 &&
        numberCount >= 1 &&
        specialCount >= 1 &&
        v.length >= 12
      ) {
        return true;
      }
      return "12-32 characters at least one uppercase, lowercase, number and special";
    }
  ]
};
