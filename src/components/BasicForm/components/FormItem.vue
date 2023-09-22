<script lang="tsx">
  import type { PropType } from 'vue';
  import type { FormSchema } from '../BasicForm';
  import { NFormItem } from 'naive-ui';
  import { componentMap } from '../componentMap';

  export default defineComponent({
    name: 'FormItem',
    props: {
      schema: {
        type: Object as PropType<FormSchema>,
        default: () => ({}),
      },
    },
    setup(props) {
      const { schema } = props;
      const Comp = componentMap.get(schema.component) as any;
      return () => (
        <NFormItem label={schema.label}>
          <Comp />
        </NFormItem>
      );
    },
  });
</script>
