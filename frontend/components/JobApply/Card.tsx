import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import ApplicationForm from '../../models/ApplicationForm/ApplicationForm';
import style from './index.module.scss';
import dayjs from 'dayjs';

export type ApplicationFormCardProps = Partial<ApplicationForm>;

export const JobApplyCard: React.FC<ApplicationFormCardProps> = (
  props
) => {
  const router = useRouter();
  const statusHandler = (status) => {
    if (status == 1) return 'waiting';
    else if (status == 2) return 'accepted';
    else return 'denied';
  }
  return (
    <a
      href={props.id ? `/apply/response/${props.id}` : undefined}
      className={style['custom-a']}
      onClick={(e) => e.preventDefault()}>
      <Card
        className={`mb-3 ${style['card']}`}
        onClick={() => {
          if (props.id) router.push(`/apply/response/${props.id}`);
        }}>
        <Row noGutters className="align-items-center">
          {/* Image */}
          <Col xs={3} md={5}>
            <Image
              src={props.jobAnnouncement.picture?.path || '/images/company/default.png'}
              width="500"
              height="500"
              layout="responsive"
              className={`${style['image']}`}
            />
          </Col>
          {/* Content */}
          <Col xs={9} md={7} className={`${style['card-details-column']}`}>
            <Card.Body>
              <h6 className="card-title mb-0">
                <Row>
                  <Col xs={8} md={12}>
                    {props.jobAnnouncement.company}
                  </Col>
                  <Col xs={4} className={`${style['wrap-text']}`}>
                    <small className="text-muted d-md-none float-right">
                      {dayjs(props.createdAt).fromNow()}
                    </small>
                  </Col>
                </Row>
              </h6>
              <p className="card-text m-0 text-primary">{props.jobAnnouncement.title}</p>
              <p className="card-text m-0">status: {statusHandler(props.status)}</p>
              <p className="card-text m-0 d-none d-md-block mt-md-4">
                <small className="text-muted">
                  {dayjs(props.createdAt).fromNow()}
                </small>
              </p>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </a>
  );
};

export default JobApplyCard;
