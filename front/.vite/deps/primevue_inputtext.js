import {
  script
} from "./chunk-FRCWHNZ6.js";
import "./chunk-OFFNAEAN.js";
import {
  BaseStyle,
  isEmpty
} from "./chunk-6VXE72DV.js";
import {
  createElementBlock,
  mergeProps,
  openBlock
} from "./chunk-YJZCKX3S.js";
import "./chunk-DZZM6G22.js";

// node_modules/primevue/inputtext/style/index.mjs
var theme = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-inputtext {\n    font-family: inherit;\n    font-feature-settings: inherit;\n    font-size: 1rem;\n    color: ".concat(dt("inputtext.color"), ";\n    background: ").concat(dt("inputtext.background"), ";\n    padding: ").concat(dt("inputtext.padding.y"), " ").concat(dt("inputtext.padding.x"), ";\n    border: 1px solid ").concat(dt("inputtext.border.color"), ";\n    transition: background ").concat(dt("inputtext.transition.duration"), ", color ").concat(dt("inputtext.transition.duration"), ", border-color ").concat(dt("inputtext.transition.duration"), ", outline-color ").concat(dt("inputtext.transition.duration"), ", box-shadow ").concat(dt("inputtext.transition.duration"), ";\n    appearance: none;\n    border-radius: ").concat(dt("inputtext.border.radius"), ";\n    outline-color: transparent;\n    box-shadow: ").concat(dt("inputtext.shadow"), ";\n}\n\n.p-inputtext:enabled:hover {\n    border-color: ").concat(dt("inputtext.hover.border.color"), ";\n}\n\n.p-inputtext:enabled:focus {\n    border-color: ").concat(dt("inputtext.focus.border.color"), ";\n    box-shadow: ").concat(dt("inputtext.focus.ring.shadow"), ";\n    outline: ").concat(dt("inputtext.focus.ring.width"), " ").concat(dt("inputtext.focus.ring.style"), " ").concat(dt("inputtext.focus.ring.color"), ";\n    outline-offset: ").concat(dt("inputtext.focus.ring.offset"), ";\n}\n\n.p-inputtext.p-invalid {\n    border-color: ").concat(dt("inputtext.invalid.border.color"), ";\n}\n\n.p-inputtext.p-variant-filled {\n    background: ").concat(dt("inputtext.filled.background"), ";\n}\n\n.p-inputtext.p-variant-filled:enabled:hover {\n    border-color: ").concat(dt("inputtext.filled.hover.background"), ";\n}\n\n.p-inputtext.p-variant-filled:enabled:focus {\n    background: ").concat(dt("inputtext.filled.focus.background"), ";\n}\n\n.p-inputtext:disabled {\n    opacity: 1;\n    background: ").concat(dt("inputtext.disabled.background"), ";\n    color: ").concat(dt("inputtext.disabled.color"), ";\n}\n\n.p-inputtext::placeholder {\n    color: ").concat(dt("inputtext.placeholder.color"), ";\n}\n\n.p-inputtext-sm {\n    font-size: ").concat(dt("inputtext.sm.font.size"), ";\n    padding: ").concat(dt("inputtext.sm.padding.y"), " ").concat(dt("inputtext.sm.padding.x"), ";\n}\n\n.p-inputtext-lg {\n    font-size: ").concat(dt("inputtext.lg.font.size"), ";\n    padding: ").concat(dt("inputtext.lg.padding.y"), " ").concat(dt("inputtext.lg.padding.x"), ";\n}\n\n.p-inputtext-fluid {\n    width: 100%;\n}\n");
};
var classes = {
  root: function root(_ref2) {
    var instance = _ref2.instance, props = _ref2.props;
    return ["p-inputtext p-component", {
      "p-filled": instance.filled,
      "p-inputtext-sm": props.size === "small",
      "p-inputtext-lg": props.size === "large",
      "p-invalid": props.invalid,
      "p-variant-filled": props.variant ? props.variant === "filled" : instance.$primevue.config.inputStyle === "filled" || instance.$primevue.config.inputVariant === "filled",
      "p-inputtext-fluid": instance.hasFluid
    }];
  }
};
var InputTextStyle = BaseStyle.extend({
  name: "inputtext",
  theme,
  classes
});

// node_modules/primevue/inputtext/index.mjs
var script$1 = {
  name: "BaseInputText",
  "extends": script,
  props: {
    modelValue: null,
    size: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    variant: {
      type: String,
      "default": null
    },
    fluid: {
      type: Boolean,
      "default": null
    }
  },
  style: InputTextStyle,
  provide: function provide() {
    return {
      $pcInputText: this,
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "InputText",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:modelValue"],
  inject: {
    $pcFluid: {
      "default": null
    }
  },
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          filled: this.filled,
          disabled: this.$attrs.disabled || this.$attrs.disabled === ""
        }
      });
    },
    onInput: function onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  },
  computed: {
    filled: function filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    },
    hasFluid: function hasFluid() {
      return isEmpty(this.fluid) ? !!this.$pcFluid : this.fluid;
    }
  }
};
var _hoisted_1 = ["value", "aria-invalid"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", mergeProps({
    type: "text",
    "class": _ctx.cx("root"),
    value: _ctx.modelValue,
    "aria-invalid": _ctx.invalid || void 0,
    onInput: _cache[0] || (_cache[0] = function() {
      return $options.onInput && $options.onInput.apply($options, arguments);
    })
  }, $options.getPTOptions("root")), null, 16, _hoisted_1);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_inputtext.js.map
