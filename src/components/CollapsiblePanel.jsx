import { useId } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export function CollapsiblePanel({
  title,
  collapsed,
  onToggle,
  children,
  as = 'section',
  headerActions = null,
  className = '',
  description = null
}) {
  const RootTag = as;
  const panelBodyId = useId();

  return (
    <RootTag className={`panel ${className}${collapsed ? ' is-collapsed' : ''}`}>
      <div className="panel-head">
        <div className="panel-heading">
          <h2 className="panel-title">{title}</h2>
          {description ? <p className="panel-description">{description}</p> : null}
        </div>
        {headerActions ? <div className="panel-head-actions">{headerActions}</div> : null}
        <button
          type="button"
          className="panel-toggle"
          onClick={onToggle}
          aria-expanded={!collapsed}
          aria-label={collapsed ? `Expand ${title}` : `Collapse ${title}`}
          aria-controls={panelBodyId}
        >
          <FontAwesomeIcon icon={collapsed ? faChevronDown : faChevronUp} />
        </button>
      </div>
      <div className="panel-body" id={panelBodyId} hidden={collapsed}>
        {!collapsed ? children : null}
      </div>
    </RootTag>
  );
}
