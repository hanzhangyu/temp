/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode(int x) { val = x; } }
 * 
 *
 * 给出两个 非空 的链表用来表示两个非负的整数。 其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4) 输出：7 -> 0 -> 8 原因：342 + 465 = 807
 */
class TwoAdd {
    public static class ListNode {
        int val;
        ListNode next;

        ListNode(int x) {
            val = x;
        }
    }

    // 该函数具有副作用
    public static void addTwoNumbers1(ListNode l1, ListNode l2) {
        int overflow = 0;
        ListNode latestL1 = l1;
        while (l1 != null && l2 != null) {
            l1.val += overflow;
            int curVal = l1.val + l2.val;
            int num = curVal % 10;
            overflow = num != curVal ? 1 : 0;
            l1.val = num;
            latestL1 = l1;
            l1 = l1.next;
            l2 = l2.next;
        }
        while (l1 != null) {
            l1.val += overflow;
            overflow = 0;
            l1 = l1.next;
        }
        while (l2 != null) {
            latestL1.next = l2;
            l2.val += overflow;
            l2 = l2.next;
        }
        if (overflow != 0) {
            latestL1.next = new ListNode(overflow);
        }
    }

    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummyHead = new ListNode(0);
        ListNode p = l1, q = l2, cur = dummyHead;
        int overflow = 0;
        while (p != null || q != null) {
            int x = p != null ? p.val : 0;
            int y = q != null ? q.val : 0;
            int curVal = x + y + overflow;
            if (curVal > 9) {
                curVal = curVal - 10;
                overflow = 1;
            } else {
                overflow = 0;
            }
            cur.next = new ListNode(curVal);
            cur = cur.next;
            p = p != null ? p.next : p;
            q = q != null ? q.next : q;
        }
        if (overflow != 0) {
            cur.next = new ListNode(overflow);
        }
        return dummyHead;
    }

    public static void main(String[] args) {
        ListNode l1 = new ListNode(2);
        l1.next = new ListNode(4);
        l1.next.next = new ListNode(3);

        ListNode l2 = new ListNode(5);
        l2.next = new ListNode(6);
        l2.next.next = new ListNode(4);

        ListNode resultList = addTwoNumbers(l1, l2);
        while (resultList != null) {
            System.out.print(resultList.val + "->");
            resultList = resultList.next;
        }
    }
}