import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Divider, Input, List, Row, Skeleton, message, Spin } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { ServiceState } from '@/models/search';
import copy from 'copy-to-clipboard';
import InfiniteScroll from 'react-infinite-scroller';

import * as icons from '@ant-design/icons';
import styles from './Services.less';

export interface Props {
  search: ServiceState;
  loading: boolean;
  activating: boolean;
  searching: boolean;
  dispatch: Dispatch;
}

const Welcome: React.FC<Props> = ({ search, dispatch, loading, searching, activating }) => {
  const { serviceList } = search;
  // const promo = useRef<any>(null);

  const searchText = (value: any) => {
    const searchData = value.target.value;

    if (searchData?.length >= 3)
      dispatch({ type: 'search/searchService', payload: { search: searchData, size: 4 } });
  };
  const handleInfiniteOnLoad = () => {
    dispatch({ type: 'search/loadMore', payload: { skip: 4 } });
  };
  const reset = () => {
    dispatch({ type: 'search/getService' });
  };
  const copyToClipboard = (id: any) => {
    const el: any = document.getElementById(id);
    const value = el?.value;
    copy(value);
    message.success(`${value} has been copied successfully to the clipboard`);
  };
  const activatedPromo = (id: string) => {
    dispatch({ type: 'search/activateService', payload: { id } });
  };
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'search/getService' });
    }
  }, [dispatch]);
  return (
    <PageContainer>
      <div className={styles.content}>
        <div>
          <div className={styles.label}>Filter</div>
          <Input style={{ width: 300 }} className={styles.filterInput} onChange={searchText} />
          <Button className={styles.resetBtn} onClick={reset}>
            Reset
          </Button>
        </div>
        <Divider />
        <div className={styles.listBox}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={handleInfiniteOnLoad}
            hasMore={true}
            useWindow={true}
            loader={<Spin />}

          >
            <List
              dataSource={serviceList}
              itemLayout="horizontal"
              size="large"

              renderItem={(x) => (
                <Skeleton loading={loading || searching}>
                  <List.Item key={x.key} className={styles.card}>
                    <Card key={x.key}>
                      <Row gutter={[24, 24]}>
                        <Col span={8}>
                          <div>{x.name}</div>
                          <div>{x.description}</div>
                        </Col>
                        <Col span={8}>
                          <div className={styles.label}>Promo code</div>
                          <Input
                            suffix={<icons.CopyFilled onClick={() => copyToClipboard(x.key)} />}
                            id={x.key}
                            name="promocode"
                            // ref={promo+x.key}
                            defaultValue={x.promo}
                            className={styles.copy}
                            readOnly
                          />
                        </Col>
                        <Col span={8}>
                          <div>
                            <Button
                              loading={activating}
                              className={styles.btnPrimary}
                              disabled={x.isActivated}
                              onClick={() => activatedPromo(x.key)}
                            >
                              Activate
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </List.Item>
                </Skeleton>
              )}
            ></List>
          </InfiniteScroll>
        </div>
      </div>
    </PageContainer>
  );
};

export default connect(({ search, loading }: { search: ServiceState; loading: any }) => ({
  search,
  loading: loading.effects['search/getService'],
  searching: loading.effects['search/searchService'],
  activating: loading.effects['search/activateService'],
}))(Welcome);
