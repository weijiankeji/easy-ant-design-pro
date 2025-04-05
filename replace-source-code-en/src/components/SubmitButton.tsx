import { Button, Form, FormInstance } from 'antd';
import { useEffect, useState } from 'react';

const SubmitButton = ({
  btnText,
  form,
  onSubmit,
}: {
  btnText: string;
  form: FormInstance;
  onSubmit: () => void;
}) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} onClick={onSubmit}>
      {btnText}
    </Button>
  );
};

export default SubmitButton;
