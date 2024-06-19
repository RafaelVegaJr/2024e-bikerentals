import React from "react";

const RentalForm = () => {
  return (
    <form>
      <h2>Rent a Bike</h2>
      <label>
        Name:
        <input type="text" name="name" autoComplete="name" />{" "}
        {/* Added autocomplete */}
      </label>
      <label>
        Bike:
        <select name="bike" autoComplete="bike">
          {" "}
          {/* Added autocomplete */}
          <option value="mountain">Mountain Bike</option>
          <option value="road">Road Bike</option>
        </select>
      </label>
      <label>
        Rental Days:
        <input type="number" name="days" autoComplete="rental-days" />{" "}
        {/* Added autocomplete */}
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RentalForm;
