function validateUserId(userId) {
    return /^[a-z][a-z0-9]{4,}$/i.test(userId);
  }
  
  function validateEmail(email) {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  }
  
  export default {
    validateUserId,
    validateEmail,
  };