(async function () {
    function onMouseOverEffect(d, isMouseOver, classLabeler, m2ClassLabeler=null) {
        d3.selectAll('circle')
            .classed("faded", isMouseOver)
            .attr("fill", (isMouseOver == false) ? 'var(--primary-color)' : 'lightgrey')
            .attr("opacity", 0.5);

        var circleSelector;
        if (m2ClassLabeler != null) {
            circleSelector = d => 'circle.' + classLabeler(d).replaceAll(' ', '.') + '.' + m2ClassLabeler(d)
            d3.selectAll('#square-meter-legend circle.' + m2ClassLabeler(d))
                .classed("selected", isMouseOver)
                .classed("faded", false)
                .attr("fill", 'var(--primary-color)')
                .attr("opacity", (isMouseOver == false) ? 0.5 : 1)
                .raise();
        }
        else {
            circleSelector = d => 'circle.' + classLabeler(d).replaceAll(' ','.')
        }

        d3.selectAll(circleSelector(d))
            .classed("selected", isMouseOver)
            .classed("faded", false)
            .attr("fill", 'var(--primary-color)')
            .attr("opacity", (isMouseOver == false) ? 0.5:1)
            .raise();

        // Selecting the address list element
        d3.selectAll('div.' + classLabeler(d).replaceAll(' ','.'))
            .classed("selected", isMouseOver);

        
    }

    function xTickIntervalCalculator(width) {
        return Math.round(width / 50)
    }
    
    function plotLegend(data) {
        const m2Accessor = d => parseFloat(d.m2);
        const classLabeler = d => 'm2' + d.m2;

        var margin = { top: 20, right: 20, bottom: 40, left: 50 };
        var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;


        if (windowWidth > 600) {
            width = 400;
            height = 100;
            rmin = 4;
            rmax = 10;
        } else {
            width = windowWidth;
            height = 100;
            rmin = 2;
            rmax = 4;
        }

        var xScale = d3
            .scaleLinear()
            .domain(d3.extent(data, m2Accessor))
            .range([margin.left, width - margin.right])
            .nice();

        var radiusScale = d3
            .scaleSqrt()
            .domain(d3.extent(data, m2Accessor))
            .range([rmin, rmax]);

        d3.selectAll("#legend").remove()
        var svg = d3
            .select("#square-meter-legend")
            .attr(
                "style",
                `padding-bottom: ${Math.ceil(height * 100 / width)}%`
            )
            .append("svg")
            .attr("id", 'legend')
            .attr("height", height)
            .attr("width", width)
            
        svg.append('filter')
                .attr('id', 'shadow')
            .append('feGaussianBlur')
                .attr('stdDeviation', 2)

        const circles = svg
            .append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(m2Accessor(d)))
            .attr("cy", height / 2)
            .attr("r", d => radiusScale(m2Accessor(d)))
            .attr("fill", 'var(--primary-color)')
            .attr("class", classLabeler);

        circles
            .on("mouseover", d => onMouseOverEffect(d, true, classLabeler))
            .on("mouseout", d => onMouseOverEffect(d, false, classLabeler));

        var xAxis = d3
            .axisBottom()
            .scale(xScale)
            .ticks(xTickIntervalCalculator(width));

        var xAxisEl = svg
            .append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis);

        var xAxisLabel = svg
            .append("text")
            .attr("class", "axisLabel")
            .text("m2")
            .attr("x", width / 2)
            .attr("y", height - 5)
            .style("text-anchor", "middle");
    }

    function plotSalesScatter(data) {
        const m2Accessor = d => parseFloat(d.m2);
        const m2PriceAccessor = d => parseFloat(d.m2Price);
        const classLabeler = d => d.streetName.replaceAll(' ', '').replaceAll('.','') + ' num' + d.streetNumber.replaceAll(/ /g, '');
        const m2ClassLabeler = d => 'm2' + d.m2;

        var parseDate = d3.timeParse('%d-%m-%Y');
        const salesDateAccessor = d => parseDate(d.salesDate);

        var margin = { top: 20, right: 20, bottom: 40, left: 70 };
        var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;

        if (windowWidth > 600) {
            width = 400;
            height = width;
            rmin = 4;
            rmax = 10;
        } else {
            width = windowWidth;
            height = 0.8*windowWidth;
            rmin = 2;
            rmax = 4;
        }

        var xScale = d3
            .scaleTime()
            .domain(d3.extent(data, salesDateAccessor))
            .range([margin.left, width - margin.right])
            .nice();

        var yScale = d3
            .scaleLinear()
            .domain(d3.extent(data, m2PriceAccessor))
            .range([height - margin.bottom, margin.top])
            .nice();

        var radiusScale = d3
            .scaleSqrt()
            .domain(d3.extent(data, m2Accessor))
            .range([rmin, rmax]);

        var xAxis = d3
            .axisBottom()
            .scale(xScale)
            .ticks(xTickIntervalCalculator(width));

        var yAxis = d3
            .axisLeft()
            .scale(yScale)
            .ticks(5);

        d3.select("#scatterPlot").remove();
        var svg = d3
            .select("#sales-prices")
            .attr(
                "style",
                `padding-bottom: ${Math.ceil(height * 100 / width)}%`
            )
            .append("svg")
                .attr("id", "scatterPlot")
            .attr("height", height)
            .attr("width", width)

        let shadow = svg.append('filter')
                .attr('id', 'shadow')
                .attr('height', '130%')
            
        shadow.append('feGaussianBlur')
                    .attr('in', 'SourceAlpha')
                    .attr('stdDeviation', 0.1)
        
        shadow.append('feOffset')
                    .attr('dx', 2)
                    .attr('dy', 2)
                    .attr('result', 'offsetblur')
                    
        let merge = shadow.append('feMerge')
                
        merge.append('feMergeNode')
        merge.append('feMergeNode')
                .attr('in', 'SourceGraphic')
        
        d3.selectAll("circle.sale").remove();
        const circles = svg
            .append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(parseDate(d.salesDate)))
            .attr("cy", d => yScale(parseFloat(d.m2Price)))
            .attr("r", d => radiusScale(parseFloat(d.m2)))
            .attr("fill", 'var(--primary-color)')
            .attr("opacity", 0.5)
            .attr("class", function (d) { return classLabeler(d) + ' ' + m2ClassLabeler(d) });


        circles
            .on("mouseover", d => onMouseOverEffect(d, true, classLabeler, m2ClassLabeler))
            .on("mouseout", d => onMouseOverEffect(d, false, classLabeler, m2ClassLabeler));

        var yAxisEl = svg
            .append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin.left},0)`)
            .call(yAxis);

        var xAxisEl = svg
            .append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis);

        var xAxisLabel = svg
            .append("text")
            .attr("class", "axisLabel")
            .text("Sales Date")
            .attr("x", width / 2)
            .attr("y", height - 5)
            .style("text-anchor", "middle");

        var yAxisLabel = svg
            .append("text")
            .attr("class", "axisLabel")
            .text("m2 price in dkk")
            .attr("transform", "rotate(-90)")
            .attr("y", 15)
            .attr("x", -height / 2)
            .style("text-anchor", "middle");
    }

    function addAddresses(data) {
        var addressContainer = d3.select("#addressesContainer")
            .attr("height", 900)
            .append("div")
            .classed('flex-container', true)

        // Create a list for each street name
        data.streets.forEach(streetObject => {
            var classyStreetName = streetObject.street.replaceAll(' ', '').replaceAll('.','')
            console.log(classyStreetName)
            var classLabeler = d => classyStreetName + ' ' + 'num' + d.replaceAll(' ', '');

            var street = addressContainer
                .append("div")
                .attr("id", streetObject.street)
                .classed('flex-item', true)

            var streetName = street
                .append("h3")
                .text(streetObject.street);
                
            var addressListUl = street.append("div")
                .classed('flex-container', true)


            var addressListLi = addressListUl.selectAll("div." + classyStreetName)
                    .data(streetObject.numbers)
                .enter()
                    .append("div")
                    .attr("class", classLabeler)
                    .classed("addressListItem", true)
                    .classed('flex-item', true)
                    .text(d => d.split(' ', 1));

            streetName
                .on("mouseover", d => onMouseOverEffect(d, true, d => classyStreetName))
                .on("mouseout", d => onMouseOverEffect(d, false, d => classyStreetName));

            addressListLi
                .on("mouseover", d => onMouseOverEffect(d, true, classLabeler))
                .on("mouseout", d => onMouseOverEffect(d, false, classLabeler));
        });    
    }

    const dataPath = '/data/real-estate'
    const salesData = await d3.csv(dataPath + "/sales.csv")
    const m2data = await d3.csv(dataPath + "/squaremeters.csv")
    const addressData = await d3.json(dataPath + "/addresses.json")
    
    plotLegend(m2data)
    plotSalesScatter(salesData)
    addAddresses(addressData)

    window.addEventListener('resize', plotSalesScatter);
    window.addEventListener('resize', plotLegend);  
})();
