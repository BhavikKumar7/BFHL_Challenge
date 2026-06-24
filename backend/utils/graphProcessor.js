function graphProcessor(data) {
    const user_id = "BhavikKumar_02072004";
    const email_id = "bhavik0142.be23@chitkara.edu.in";
    const college_roll_number = "2310990142";

    const invalid_entries = [];
    const duplicate_edges = [];

    const edgeSet = new Set();
    const duplicateSet = new Set();

    const childParent = {};
    const adj = {};
    const allNodes = new Set();
    const childNodes = new Set();

    // ---------- Validation ----------
    for (let entry of data) {

        entry = entry.trim();

        const regex = /^[A-Z]->[A-Z]$/;

        if (!regex.test(entry)) {
            invalid_entries.push(entry);
            continue;
        }

        const [parent, child] = entry.split("->");

        // self loop is invalid
        if (parent === child) {
            invalid_entries.push(entry);
            continue;
        }

        // duplicate edge
        if (edgeSet.has(entry)) {
            if (!duplicateSet.has(entry)) {
                duplicate_edges.push(entry);
                duplicateSet.add(entry);
            }
            continue;
        }

        edgeSet.add(entry);

        // multi parent case
        if (childParent[child]) continue;

        childParent[child] = parent;

        if (!adj[parent]) adj[parent] = [];
        adj[parent].push(child);

        allNodes.add(parent);
        allNodes.add(child);
        childNodes.add(child);
    }

    // ---------- Build Undirected Graph for Components ----------
    const undirected = {};

    for (let node of allNodes) {
        undirected[node] = [];
    }

    for (let parent in adj) {
        for (let child of adj[parent]) {
            undirected[parent].push(child);
            undirected[child].push(parent);
        }
    }

    // ---------- Find Components ----------
    const visitedComponent = new Set();
    const components = [];

    function dfsComponent(node, component) {
        visitedComponent.add(node);
        component.push(node);

        for (let nei of undirected[node]) {
            if (!visitedComponent.has(nei)) {
                dfsComponent(nei, component);
            }
        }
    }

    for (let node of allNodes) {
        if (!visitedComponent.has(node)) {
            const component = [];
            dfsComponent(node, component);
            components.push(component);
        }
    }

    const hierarchies = [];

    let total_trees = 0;
    let total_cycles = 0;
    let maxDepth = 0;
    let largest_tree_root = "";

    // ---------- Process Each Component ----------
    for (let component of components) {

        const componentSet = new Set(component);

        // roots = nodes never appearing as child
        let roots = component.filter(node => !childNodes.has(node));

        let root;

        if (roots.length === 0) {
            // pure cycle
            root = [...component].sort()[0];
        } else {
            root = roots.sort()[0];
        }

        // cycle detection
        const visited = new Set();
        const recStack = new Set();

        function hasCycle(node) {

            visited.add(node);
            recStack.add(node);

            const children = adj[node] || [];

            for (let child of children) {

                if (!componentSet.has(child)) continue;

                if (!visited.has(child)) {
                    if (hasCycle(child)) return true;
                } else if (recStack.has(child)) {
                    return true;
                }
            }

            recStack.delete(node);

            return false;
        }

        const cycleExists = hasCycle(root);

        if (cycleExists) {

            total_cycles++;

            hierarchies.push({
                root,
                tree: {},
                has_cycle: true
            });

            continue;
        }

        // ---------- Build Tree ----------
        function buildTree(node) {

            const obj = {};

            const children = adj[node] || [];

            for (let child of children) {
                obj[child] = buildTree(child);
            }

            return obj;
        }

        // ---------- Depth ----------
        function calculateDepth(node) {

            const children = adj[node] || [];

            if (children.length === 0) return 1;

            let mx = 0;

            for (let child of children) {
                mx = Math.max(mx, calculateDepth(child));
            }

            return mx + 1;
        }

        const depth = calculateDepth(root);

        total_trees++;

        if (
            depth > maxDepth ||
            (depth === maxDepth && root < largest_tree_root)
        ) {
            maxDepth = depth;
            largest_tree_root = root;
        }

        hierarchies.push({
            root,
            tree: {
                [root]: buildTree(root)
            },
            depth
        });
    }

    return {
        user_id,
        email_id,
        college_roll_number,
        hierarchies,
        invalid_entries,
        duplicate_edges,
        summary: {
            total_trees,
            total_cycles,
            largest_tree_root
        }
    };
}

module.exports = { graphProcessor };