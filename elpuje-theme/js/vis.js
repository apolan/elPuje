/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//	data stores
var graph, store;
//	svg selection and sizing
var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height")
        ;
//	d3 color scales
var color = d3.scaleOrdinal(d3.schemeCategory10);
var link = svg.append("g").selectAll(".link"),
        node = svg.append("g").selectAll(".node");
//	force simulation initialization
var simulation = d3.forceSimulation()
        .force("link", d3.forceLink()
                .id(function (d) {
                    return d.id;
                }))
        .force("charge", d3.forceManyBody()
                .strength(function (d) {
                    return -500;
                }))
        .force("center", d3.forceCenter(width / 2, height / 2));
//	filtered types
typeFilterList = [];
//	filter button event handlers

function filterMaster(action) {
    var id = "";
    var act = "";

    if (action === 'rel-Persona') {
        act = "link";
        id = "Persona";

        offLabel("btn-flt-lnk-persona");
    } else if (action === 'rel-Actividad') {
        id = "Actividad";
        act = "link";

        offLabel("btn-flt-lnk-actividad");
    } else if (action === 'nod-Persona') {
        id = "Persona";
        act = "node";

        offLabel("btn-flt-nod-persona");
    } else if (action === 'nod-Actividad') {
        id = "Actividad";
        act = "node";
        offLabel("btn-flt-nod-actividad");
    } else {
        console.log("Filter not define");
        return;
    }

    if (typeFilterList.includes(id)) {
        typeFilterList.splice(typeFilterList.indexOf(id), 1);
        console.log("remove " + id);

    } else {
        typeFilterList.push(id);
        console.log("add " + id);
    }

    filter(id, act);
    update();
}


//	data read and store

var nodeByID = {};
data.nodes.forEach(function (n) {
    nodeByID[n.id] = n;
    //console.log("id:" + n.id);
});
data.links.forEach(function (l) {
    //console.log(nodeByID[l.source].group + " " + nodeByID[l.target].group);
    l.sourceGroup = nodeByID[l.source].group.toString();
    l.targetGroup = nodeByID[l.target].group.toString();
});
graph = data;
store = $.extend(true, {}, data);
update();
//	general update pattern for updating the graph
function update() {
    //	UPDATE
    node = node.data(graph.nodes, function (d) {
        return d.id;
    });
    //	EXIT
    node.exit().remove();
    //	ENTER
    var newNode = node.enter().append("circle")
            .attr("class", "node")
            .attr("r", function (d) {
                return d.size
            })
            .attr("fill", function (d) {
                if (d.type === "Actividad") {
                    return "gray";
                } else {
                    return color(d.group);
                }

            })
            .on("mouseover", function (d) {
                //console.log("mouse over:" + d.id + " " + d.size);
                //console.log(d3.select(this));
                d3.select(this).transition()
                        .duration(750)
                        .attr("r", d.size * 2);
            })
            .on("mouseout", function (d) {
                //console.log("mouse over:" + d.id + " " + d.size);
                //console.log(d3.select(this));
                d3.select(this).transition()
                        .duration(750)
                        .attr("r", d.size);
            }).on("click", function (d) {
        console.log("Click:" + d.id + " " + d.size);
        //console.log(d3.select(this));
        $("#dashboard h1").text(d.id);
        $("#dashboard h2").text(d.type);
        $("#dashboard h3").text(d.name);


        d3.select(this).transition()
                .duration(750)
                .attr("r", d.size);
    })

            .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
                    )

    newNode.append("title")
            .text(function (d) {
                return "group: " + d.group + "\n" + "id: " + d.id;
            });
    //	ENTER + UPDATE
    node = node.merge(newNode);
    //	UPDATE
    link = link.data(graph.links, function (d) {
        return d.id;
    });
    //	EXIT
    link.exit().remove();
    //	ENTER
    newLink = link.enter().append("line")
            .attr("class", "link");
    newLink.append("title")
            .text(function (d) {
                return "source: " + d.source + "\n" + "target: " + d.target;
            });
    //	ENTER + UPDATE
    link = link.merge(newLink);
    //	update simulation nodes, links, and alpha
    simulation
            .nodes(graph.nodes)
            .on("tick", ticked);
    simulation.force("link")
            .links(graph.links);
    simulation.alpha(1).alphaTarget(0).restart();
}

//	drag event handlers
function dragstarted(d) {
    if (!d3.event.active)
        simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active)
        simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

//	tick event handler with bounded box
function ticked() {
    node
            .attr("cx", function (d) {
                return d.x = Math.max(d.size, Math.min(width - d.size, d.x));
            })
            .attr("cy", function (d) {
                return d.y = Math.max(d.size, Math.min(height - d.size, d.y));
            });
    link
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });
}

//	filter function


function filter(type, action) {

    // Links
    if (action === "link" && (type === "Persona" || type === "Actividad")) {
        //	add and remove nodes from data based on type filters

        //	add and remove links from data based on availability of nodes
        store.links.forEach(function (l) {
            if (!(typeFilterList.includes(l.type) || typeFilterList.includes(l.type)) && l.filtered) {
                l.filtered = false;
                graph.links.push($.extend(true, {}, l));
            } else if ((typeFilterList.includes(l.type) || typeFilterList.includes(l.type)) && !l.filtered) {
                l.filtered = true;
                graph.links.forEach(function (d, i) {
                    if (l.type === d.type) {
                        graph.links.splice(i, 1);
                    }
                });
            }
        });
    } else if (action === "node" && (type === "Persona" || type === "Actividad")) {
        //if (type === "Actividad") {
        //    filterMaster("rel-Persona");
        //}
        //filter(type, "link");

        store.nodes.forEach(function (n) {
            if (!typeFilterList.includes(n.type) && n.filtered) {
                n.filtered = false;
                graph.nodes.push($.extend(true, {}, n));
            } else if (typeFilterList.includes(n.type) && !n.filtered) {
                n.filtered = true;
                graph.nodes.forEach(function (d, i) {
                    if (n.id === d.id) {
                        graph.nodes.splice(i, 1);
                    }
                });
            }
        });
        filterMaster("rel-Persona");
    }
    /*
     else{
     store.nodes.forEach(function (n) {
     if (!typeFilterList.includes(n.type) && n.filtered) {
     n.filtered = false;
     graph.nodes.push($.extend(true, {}, n));
     } else if (typeFilterList.includes(n.type) && !n.filtered) {
     n.filtered = true;
     graph.nodes.forEach(function (d, i) {
     if (n.id === d.id) {
     graph.nodes.splice(i, 1);
     }
     });
     }
     });    
     }*/

}