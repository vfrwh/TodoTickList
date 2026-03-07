import { Modal } from "antd";

const { confirm } = Modal;
const TOKEN = "token";
let hasInitialized = false; // 标记是否已经初始化检查

const setToken = (token: string, isAdmin: boolean = false) => {
  // 如果是管理员token，添加特殊标识
  const finalToken = isAdmin ? `admin_${token}` : token;
  localStorage.setItem(TOKEN, finalToken);
  hasInitialized = false; // 设置新token时重置标记
};

const getToken = () => {
  return localStorage.getItem(TOKEN);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

// 检查当前token是否是管理员token
const checkIsAdmin = (): boolean => {
  const token = getToken();
  if (!token) return false;
  return token.startsWith("admin_");
};

// 显示登录过期提示框（普通用户才显示）
const showExpiredModal = () => {
  // 如果是管理员，不显示弹框
  if (checkIsAdmin()) {
    console.log("管理员登录，跳过过期检查");
    return;
  }

  // 防止重复显示弹框
  if (Modal.destroyAll) {
    Modal.destroyAll();
  }

  confirm({
    title: "登录已过期",
    content: "您的登录状态已过期，需要重新登录才能继续使用",
    okText: "重新登录",
    cancelText: "取消",
    onOk() {
      removeToken();
      // 跳转到登录页
      window.location.href = "/login";
    },
  });
};

// 检查token是否过期的函数（管理员永远返回false）
const isTokenExpired = (): boolean => {
  const token = getToken();

  if (!token) {
    return true;
  }

  // 如果是管理员token，永不过期
  if (token.startsWith("admin_")) {
    return false;
  }

  try {
    // 解析JWT token（去掉可能的admin前缀）
    const cleanToken = token.replace("admin_", "");
    const payload = JSON.parse(atob(cleanToken.split(".")[1]));

    // 检查是否有exp字段
    if (!payload.exp) {
      console.warn("token中没有exp字段，无法判断过期时间");
      return false; // 没有过期时间字段，认为未过期
    }

    const expirationTime = payload.exp * 1000; // 转换为毫秒
    const now = Date.now();

    // 如果当前时间大于过期时间，说明已过期
    return now >= expirationTime;
  } catch (e) {
    console.error("解析token失败:", e);
    // 如果是管理员token且解析失败，仍然认为有效
    if (token.startsWith("admin_")) {
      return false;
    }
    // 如果解析失败，默认token无效
    return true;
  }
};

// 启动token过期检查的定时器
let expirationCheckInterval: number | null = null;

// 启动token过期检查（在需要认证的页面调用）
const startTokenExpirationCheck = () => {
  // 如果是管理员，不启动过期检查
  if (checkIsAdmin()) {
    console.log("管理员登录，跳过过期检查定时器");
    return;
  }

  if (expirationCheckInterval) {
    clearInterval(expirationCheckInterval);
  }

  // 首次启动时不立即检查，只设置定时器
  if (!hasInitialized) {
    hasInitialized = true;
    console.log("Token过期检查已启动（首次）");
  }

  expirationCheckInterval = setInterval(
    () => {
      const token = getToken();
      // 再次检查是否是管理员（防止在定时器期间变为管理员）
      if (token && token.startsWith("admin_")) {
        console.log("检测到管理员token，停止过期检查");
        stopTokenExpirationCheck();
        return;
      }

      if (token && isTokenExpired()) {
        console.log("Token已过期，清理本地存储");
        removeToken();
        // 触发过期事件，让组件可以响应
        window.dispatchEvent(new CustomEvent("token-expired"));
        // 显示过期提示框
        showExpiredModal();
      }
    },
    10 * 60 * 1000,
  ); // 10分钟检查一次

  console.log("Token过期检查已启动");
};

// 停止token过期检查（在白名单页面调用）
const stopTokenExpirationCheck = () => {
  if (expirationCheckInterval) {
    clearInterval(expirationCheckInterval);
    expirationCheckInterval = null;
    console.log("Token过期检查已停止");
  }
};

// 立即检查一次token（在AuthRoute中使用）- 不显示弹框
const checkTokenImmediately = (): boolean => {
  const token = getToken();

  // 管理员token永远有效
  if (token && token.startsWith("admin_")) {
    return true;
  }

  if (isTokenExpired()) {
    removeToken();
    return false;
  }
  return true;
};

// 立即检查并显示提示框（用于页面切换时的检查）
const checkAndShowExpiredModal = (forceCheck = false): boolean => {
  const token = getToken();

  // 管理员token永远有效，不显示弹框
  if (token && token.startsWith("admin_")) {
    return true;
  }

  // 如果不是强制检查且是首次初始化，不显示弹框
  if (!forceCheck && !hasInitialized) {
    return true;
  }

  if (isTokenExpired()) {
    removeToken();
    return false;
  }
  return true;
};

export {
  setToken,
  getToken,
  removeToken,
  isTokenExpired,
  startTokenExpirationCheck,
  stopTokenExpirationCheck,
  checkTokenImmediately,
  checkAndShowExpiredModal,
  showExpiredModal,
  checkIsAdmin,
};
