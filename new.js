
app.get("/stat", isLoggedIn, async (req, res) => {
  try {
    const newdata = await Sales.find({});

    const monthSales = await Sales.aggregate([
      {
        $project: {
          unit_price: 1,
          total_sale: 1,
          month: {
            $month: {
              date: "$timestamp",
            },
          },
        },
      },
    ]);

    res.render("sales_stat", { newdata, monthSales });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
