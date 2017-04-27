({
    dataChange: function(component, event, helper) {
        var data = component.get("v.data"),
            mChildren = helper.getChildrenMap(data),
            offSetIndex = component.get("v.offSetIndex"),
            parents = helper.getRootNodes(data),
            displaySize = component.get("v.config.rowsDisplayed")
                ? component.get("v.config.rowsDisplayed")
                : 10,
            offSetData = parents.slice(offSetIndex, displaySize),
            newOffSet,
            rangeStart,
            newOffSetData;

        helper.setHasChildren(offSetData, mChildren);
        component.set("v.view", offSetData);
        component.set("v.offSetIndex", displaySize);

        component.mouseWheelHandler = function(e) {
            if (e.wheelDeltaY < 0) {
                e.preventDefault();
                newOffSet = component.get("v.offSetIndex") + 1;
                rangeStart = newOffSet - displaySize;
                newOffSetData = parents.slice(rangeStart, newOffSet);
                helper.setHasChildren(newOffSetData, mChildren);
                component.set("v.view", newOffSetData);
                component.set("v.offSetIndex", newOffSet);
            } else if (e.wheelDeltaY > 0) {
                e.preventDefault();
                newOffSet = component.get("v.offSetIndex") - 1;
                rangeStart = newOffSet - displaySize;
                if (rangeStart > 0) {
                    newOffSetData = parents.slice(rangeStart, newOffSet);
                    helper.setHasChildren(newOffSetData, mChildren);
                    component.set("v.view", newOffSetData);
                    component.set("v.offSetIndex", newOffSet);
                } else {
                    component.set("v.view", offSetData);
                    component.set("v.offSetIndex", displaySize);
                }
            }
        };
    },

    bindMouseWheel: function(component) {
        var config = component.get("v.config"), scrollable = config.scrollable;
        if (scrollable) {
            document.addEventListener(
                "wheel",
                component.mouseWheelHandler,
                false
            );
        }
    },

    unbindMouseWheel: function(component) {
        var config = component.get("v.config"), scrollable = config.scrollable;
        if (scrollable) {
            document.removeEventListener("wheel", component.mouseWheelHandler);
        }
    },
    loadMore: function(component, event, helper) {
        var data = component.get("v.data");
        var mChildren = helper.getChildrenMap(data),
            parents = helper.getRootNodes(data),
            displaySize = component.get("v.config.rowsDisplayed")
                ? component.get("v.config.rowsDisplayed")
                : 10;

        displaySize += 10;
        component.set("v.config.rowsDisplayed", displaySize);
        var offSetData = parents.slice(0, displaySize);
        helper.setHasChildren(offSetData, mChildren);
        component.set("v.view", offSetData);
    }
});
