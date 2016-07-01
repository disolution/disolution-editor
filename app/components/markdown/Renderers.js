import React from 'react';
import path from 'path';
import { Checkbox } from 'material-ui';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { sunburst } from 'react-syntax-highlighter/dist/styles';

export const CodeBlock = ({ language, literal }) => (
  <SyntaxHighlighter language={language} style={sunburst}>
    {literal}
  </SyntaxHighlighter>
);

export const Image = (projectPath, { src, title, alt, nodeKey, ...others }) => {
  const newSrc = !/^https?:\/\/.+$/.test(src) ? path.join(projectPath, src) : src;
  return (
    <img key={nodeKey} src={newSrc} title={title} alt={alt} {...others} />
  );
};

export const List = (onChange, { type, children }) => {
  const ListTag = type === 'Bullet' ? 'ul' : 'ol';
  const TodoItem = ({ done, value }) => (
    <li style={{ marginLeft: -22, listStyle: 'none' }}>
      <Checkbox
        label={value}
        onCheck={onChange.bind(this, !done, value)}
        checked={done}
      />
    </li>
  );

  return (
    <ListTag>
      {React.Children.map(children, item => {
        const value = String(item.props.children);
        const done = /^\[x\]/.test(value);
        const todo = /^\[ \]/.test(value);

        return done || todo ?
          <TodoItem done={done} value={value.slice(3)} />
        : item;
      })}
    </ListTag>
  );
};
