import React from "react";
import { FixedSizeList as List } from "react-window";
import { FixedSizeGrid as Grid } from "react-window";

const VirtualizedList = ({
  items,
  height,
  width,
  columnCount,
  rowCount,
  itemHeight,
  itemWidth,
  renderItem,
  listType,
  itemSize,
}) => {
  if (listType === "list") {
    return (
      <List
        height={height} // Height of the list container
        itemCount={items.length} // Number of items in the list
        itemSize={itemSize} // Size of each item
        width={width} // Width of the list container
      >
        {({ index, style }) => (
          <div style={style}>
            {renderItem(items[index], index)}{" "}
            {/* Custom render function for list items */}
          </div>
        )}
      </List>
    );
  }
  return (
    <Grid
      columnCount={columnCount}
      rowCount={rowCount}
      columnWidth={itemWidth}
      rowHeight={itemHeight}
      height={height}
      width={width}
    >
      {({ columnIndex, rowIndex, style }) => {
        const index = rowIndex * columnCount + columnIndex;
        if (index >= items.length) return null; // Prevent rendering non-existent items
        return <div style={style}>{renderItem(items[index], index)}</div>;
      }}
    </Grid>
  );
};

export default VirtualizedList;
