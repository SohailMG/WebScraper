
/**
 * class to store each show and their details
 */
class Show {

    /**
     * 
     * @param {String} name 
     * @param {Integer} rating 
     * @param {String} genre 
     * @param {String} date 
     */
    constructor(name, rating,genre,date,image) {
      this.name = name;
      this.rating = rating;
      this.genre = genre;
      this.date = date;
      this.image = image;
    }
    getShowRating(){
      return this.rating;
    }
  }

module.exports = {Show}