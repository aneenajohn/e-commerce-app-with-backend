{
  /* <div className="container__aside">
<fieldset>
  <legend class="para">Sort By</legend>
  <label class="para para--label">
    <input
      type="radio"
      name="sort"
      onChange={() =>
        productDispatch({ type: "SORT", payLoad: "PRICE_HIGH_TO_LOW" })
      }
      checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
    ></input>
    Price - High to low
  </label>
  <br />
  <label class="para para--label">
    <input
      type="radio"
      name="sort"
      onChange={() =>
        productDispatch({ type: "SORT", payLoad: "PRICE_LOW_TO_HIGH" })
      }
      checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
    ></input>
    Price - Low to high
  </label>
</fieldset>
<fieldset>
  <legend class="para">Availability</legend>
  <label class="para para--label">
    <input
      type="checkbox"
      checked={showInventoryAll}
      onChange={() => productDispatch({ type: "TOGGLE_INVENTORY" })}
    ></input>
    Include out of stock
  </label>
  <br />
  <label class="para para--label">
    <input
      type="checkbox"
      checked={showFastDeliveryOnly}
      onChange={() => productDispatch({ type: "TOGGLE_DELIVERY" })}
    ></input>
    Only fast Delivery
  </label>
</fieldset>
<div
  class="btn btn--primary filter-label"
  onClick={() => productDispatch({ type: "CLEAR_FILTER" })}
>
  Clear Filter
</div>
</div> */
}
