(function() {
  d3.json("/data/coupled-oscillators/theta-vs-time.json", function(error, data) {
    drawAngleVsTime(data);
  });

  function drawAngleVsTime(data) {
    var margin = { top: 20, right: 20, bottom: 50, left: 50 };
    var windowWidth =
      parseInt(d3.select("body").style("width"), 10) -
      margin.left -
      margin.right;
    if (windowWidth > 600) {
      width = 600;
      height = 350;
    } else {
      width = windowWidth;
      height = 0.5 * windowWidth;
    }

    // Defining the scales
    var xScale = d3
      .scaleLinear()
      .domain([0, 20])
      .range([margin.left, width - margin.right]);

    var yScale = d3
      .scaleLinear()
      .domain(d3.extent(data.data, d => d.var_theta))
      .range([height - margin.bottom, margin.top]);

    // Defining the axes
    var xAxis = d3
      .axisBottom()
      .scale(xScale)
      .ticks(5);
    var yAxis = d3
      .axisLeft()
      .scale(yScale)
      .ticks(5);

    // Drawing the canvas
    var svg = d3
      .select("#varThetaVsTime")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    var line = d3
      .line()
      .x(d => xScale(d.step))
      .y(d => yScale(d.var_theta));

    svg
      .append("svg:path")
      .datum(data.data)
      .attr("fill", "none")
      .attr("stroke", 'var(--secondary-color)')
      .attr("stroke-width", 1)
      .attr("opacity", 1)
      .attr("d", line)
      .attr("id", "varThetaVsTimeLine");

    // Draw the x axis
    var xAxisEl = svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    // Draw the y axis
    var yAxisEl = svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    var xAxisLabel = svg
      .append("text")
      .attr("class", "axisLabel")
      .text("Time step")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .style("text-anchor", "middle");

    var yAxisLabel = svg
      .append("text")
      .attr("class", "axisLabel")
      .text("Var Theta")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("x", -height / 2)
      .style("text-anchor", "middle");

    function resizeChart() {
      var windowWidth =
        parseInt(d3.select("body").style("width"), 10) -
        margin.left -
        margin.right;
      if (windowWidth > 600) {
        width = 600;
        height = 350;
      } else {
        width = windowWidth;
        height = 0.5 * windowWidth;
      }

      svg.attr("height", height).attr("width", width);

      xScale.range([margin.left, width - margin.right]);
      xAxis.scale(xScale).ticks(5);

      xAxisEl
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

      yScale.range([height - margin.bottom, margin.top]);
      yAxis.scale(yScale).ticks(5);

      yAxisEl.attr("transform", `translate(${margin.left},0)`).call(yAxis);

      xAxisLabel.attr("x", width / 2).attr("y", height - 5);

      yAxisLabel.attr("y", 15).attr("x", -height / 2);

      // Remove the existing line
      d3.select("#varThetaVsTimeLine").remove();

      var line = d3
        .line()
        .x(d => xScale(d.step))
        .y(d => yScale(d.var_theta));

      svg
        .append("svg:path")
        .datum(data.data)
        .attr("fill", "none")
        .attr("stroke", 'var(--secondary-color)')
        .attr("stroke-width", 1)
        .attr("opacity", 1)
        .attr("d", line)
        .attr("id", "varThetaVsTimeLine");
    }

    // redraw chart on resize
    window.addEventListener("resize", resizeChart);
  }
})();
