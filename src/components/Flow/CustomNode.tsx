import { memo, FC } from "react";
import { Handle, Position, NodeProps } from "reactflow";

const CustomNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  return (
    <>
      <Handle type='target' position={Position.Left} />
      <div className='p-4 bg-slate-500 rounded-md w-72 h-96'>
        <div>
          Label: <strong>{data.label}</strong>
        </div>
        <div>
          Position:{" "}
          <strong>
            {xPos.toFixed(2)},{yPos.toFixed(2)}
          </strong>
        </div>
      </div>

      <Handle type='source' position={Position.Right} />
    </>
  );
};

export default memo(CustomNode);
