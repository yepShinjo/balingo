// RightSidebar.tsx
import Image from 'next/image';
import '../global.css';

export const RightSidebar = () => (
  <div className="right-sidebar pr-10">
    <div className="coconut-tree-container">
      <Image
        src="/coconutTree.png"
        alt="Coconut Tree"
        layout="responsive"
        width={300} // Specify the width
        height={600} // Specify the height
      />
    </div>
  </div>
);
