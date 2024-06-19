import React from "react";

const DeliveryForm = () => {
  return (
    <form>
      <h2>Delivery Service</h2>
      <label>
        Name:
        <input type="text" name="name" autoComplete="name" />{" "}
        {/* Added autocomplete */}
      </label>
      <label>
        Address:
        <input type="text" name="address" autoComplete="street-address" />{" "}
        {/* Added autocomplete */}
      </label>
      <label>
        Delivery Date:
        <input type="date" name="date" autoComplete="delivery-date" />{" "}
        {/* Added autocomplete */}
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DeliveryForm;
