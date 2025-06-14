import { createStore } from 'vuex' // 添加这行导入

export default createStore({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        currentScan: {
            status: 'idle',
            progress: 0,
            targets: [],
            requirements: '',
            selectedPlugins: [],
            scanDepth: 5,
            vulnerabilities: [],
            startTime: null,
            endTime: null,
            error: null
        },
        validationTools: [
            { id: 1, name: 'ExploitDB 验证', value: 'exploitdb' },
            { id: 2, name: '自定义验证脚本', value: 'custom' },
            { id: 3, name: 'MCP 验证框架', value: 'mcp', disabled: true }
        ],
        plugins: [
            { id: 1, name: 'SQLMap (SQL 注入检测)', value: 'sqlmap' },
            { id: 2, name: 'OWASP ZAP (综合扫描)', value: 'zap' },
            { id: 3, name: 'NMAP (端口与服务扫描)', value: 'nmap' },
            { id: 4, name: 'Dirsearch (目录扫描)', value: 'dirb' }
        ],
        scanHistory: []
    },
    mutations: {
        SET_SCAN_TARGETS(state, targets) {
            state.currentScan.targets = targets;
        },
        SET_SCAN_REQUIREMENTS(state, requirements) {
            state.currentScan.requirements = requirements;
        },
        SET_SELECTED_PLUGINS(state, plugins) {
            state.currentScan.selectedPlugins = plugins;
        },
        SET_SCAN_DEPTH(state, depth) {
            state.currentScan.scanDepth = depth;
        },
        START_SCAN(state) {
            state.currentScan = {
                ...state.currentScan,
                status: 'scanning',
                progress: 0,
                vulnerabilities: [],
                startTime: new Date(),
                endTime: null,
                error: null
            };
        },
        UPDATE_SCAN_PROGRESS(state, progress) {
            state.currentScan.progress = progress;
        },
        COMPLETE_SCAN(state, results) {
            const completedState = {
                ...state.currentScan,
                status: 'completed',
                progress: 100,
                vulnerabilities: results,
                endTime: new Date()
            }
            state.currentScan = completedState

            // 深拷贝保存历史
            const historyEntry = JSON.parse(JSON.stringify(completedState));
            historyEntry.id = Date.now().toString();
            state.scanHistory.unshift(historyEntry);

            // 限制历史记录数量
            if (state.scanHistory.length > 50) {
                state.scanHistory.pop();
            }
        },
        SET_SCAN_FAILED(state, error) {
            state.currentScan = {
                ...state.currentScan,
                status: 'failed',
                error: error,
                endTime: new Date()
            };
        },
        SET_SCAN_CANCELLED(state) {
            state.currentScan = {
                ...state.currentScan,
                status: 'cancelled',
                endTime: new Date()
            };
        }
    },
    actions: {
        async startScan({ commit, state }) {
            commit('START_SCAN');
            let intervalId = setInterval(() => {
                if (state.currentScan.status === 'cancelled') {
                    clearInterval(intervalId);
                    return;
                }
                commit('UPDATE_SCAN_PROGRESS', Math.min(state.currentScan.progress + 5, 95));
            }, 500);

            try {
                // 实际替换为API调用
                const results = [
                    {
                        id: 'vuln-1',
                        name: 'SQL 注入漏洞',
                        target: state.currentScan.targets[0] || 'http://example.com/login',
                        severity: 'critical',
                        cve: 'CVE-2023-12345',
                        description: '在登录接口发现 SQL 注入漏洞',
                        status: 'pending'
                    },
                    {
                        id: 'vuln-2',
                        name: '跨站脚本漏洞 (XSS)',
                        target: state.currentScan.targets[0] || 'http://example.com/feedback',
                        severity: 'high',
                        cve: 'CVE-2023-54321',
                        description: '在用户反馈表单中发现存储型 XSS 漏洞',
                        status: 'pending'
                    }
                ];
                commit('COMPLETE_SCAN', results);
            } catch (error) {
                commit('SET_SCAN_FAILED', error.message);
            } finally {
                clearInterval(intervalId);
            }
        },
        cancelScan({ commit }) {
            commit('SET_SCAN_CANCELLED');
        }
    },
    getters: {
        scanDuration: state => {
            if (!state.currentScan.startTime) return 0;
            const end = state.currentScan.endTime || new Date();
            return Math.round((end - state.currentScan.startTime) / 1000);
        },
        firstTarget: state => state.currentScan.targets?.[0] || 'N/A'
    }
})