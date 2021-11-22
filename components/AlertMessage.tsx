import React, {useContext} from "react";
import {Message} from "semantic-ui-react";
import {AppContext} from "../lib/AppContext";
import {AlertMsg} from "../lib/initAlert";
import styled from "styled-components";
import classNames from "classnames";
import {useRouter} from "next/router";

function getIcon(type: AlertMsg['type']): string {
  if (type === 'success') return "cru-fo-check-circle"
  if (type === 'error') return "cru-fo-x-circle"
  if (type === 'warn') return "cru-fo-info-circle"
  return "cru-fo-info-circle"
}

export interface Props {
  className: string
}

function AlertMessage(props: Props) {
  const {className} = props
  const {alert} = useContext(AppContext)
  const r = useRouter()
  // const isMain = (r.pathname === '' || r.pathname === '/')
  const isMain = false;
  return <div className={classNames(className, {isMain})}>
    {
      alert.alerts.map((msg, index) =>
        <Message
          className={classNames("msg", "font-sans-regular", {isMain})}
          key={`alert_${index}`}
          size={'small'}
        >
          <span className={`cru-fo ${getIcon(msg.type)} ${msg.type}`}/>
          {msg.title && <Message.Header>{msg.title}</Message.Header>}
          <Message.Content>{msg.msg}</Message.Content>
        </Message>)
    }
  </div>
}

export default React.memo(styled(AlertMessage)`
  position: fixed;
  width: 100%;
  height: 0;
  overflow: visible;
  z-index: 10000;
  top: 86px;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0;

  .msg {
    flex-shrink: 0;
    display: block;
    padding: 1.14rem 1.7rem;
    background: #FFFFFF;
    box-shadow: 0 0.57rem 1.14rem 0 rgba(0, 0, 0, 0.06) !important;
    border-radius: 0.86rem !important;
    border: 0.07rem solid #EEEEEE;
    
    &.isMain {
      background-color: rgba(255, 255, 255, 0.15);
      border: unset;
      margin-right: 3.4rem;
      align-self: flex-end;

      .content {
        color: white !important;
      }
    }

    .content {
      display: inline-block;
      color: var(--secend-color) !important;
      font-size: 1.14rem;
    }
  }

  .cru-fo {
    font-size: 1.4rem;
    float: left;
    margin-right: 0.8rem;
    display: inline-block;
  }

  .success {
    color: #56CB8F;
  }

  .error {
    color: #F37565;
  }

  .warn {
    color: #cbae56;
  }

  .info {
    color: #3b62d2;
  }
`)
